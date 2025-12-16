#!/usr/bin/env perl
use strict;
use warnings;
use JSON;
use Term::ANSIColor qw(colored);
use List::Util qw(min);
use Encode qw(encode_utf8);

my $json_file = $ARGV[0] || 'src/data/tools.json';
my $username = 'meppen@aceeu.org';
my $api_key = 'pit-sm3DRVfhzEWl';
my $quiet = grep { $_ eq '--quiet' || $_ eq '-q' } @ARGV;

die "Usage: $0 <json_file> [--quiet|-q]\n" unless -f $json_file;

print "Extracting text fields from $json_file...\n\n";

# Get all field names and their paths
my $fields_cmd = qq{jq -r 'paths(scalars) as \$p | \$p | join(".")' "$json_file" | sort -u};
my @field_paths = `$fields_cmd`;
chomp @field_paths;

print "Found " . scalar(@field_paths) . " unique field paths\n\n";

my $total_issues = 0;
my $fields_checked = 0;

for my $field_path (@field_paths) {
    # Extract all values for this field path
    my $extract_cmd = qq{jq -r 'getpath([split(".")[]]) // empty' "$json_file" <<< '{"path": "$field_path"}'};
    $extract_cmd = qq{jq -r 'path($field_path) as \$p | getpath(\$p) // empty' "$json_file"};

    # Simpler approach - extract by field path
    $extract_cmd = qq{jq -r 'paths(scalars) as \$p | select(\$p | join(".") == "$field_path") | getpath(\$p)' "$json_file"};

    my @values = `$extract_cmd 2>/dev/null`;
    chomp @values;

    # Filter for meaningful text (longer than 15 chars, contains letters)
    my @text_values = grep { length($_) > 15 && /[a-zA-Z]/ && !/^https?:/ } @values;

    next unless @text_values;

    print colored("Checking field: $field_path\n", 'cyan');
    $fields_checked++;

    for my $value (@text_values) {
        # Skip if too long for a single check
        if (length($value) > 50000) {
            print "  SKIPPED: Value too long (" . length($value) . " chars)\n";
            next;
        }

        print "  Checking: " . substr($value, 0, 60) . (length($value) > 60 ? "..." : "") . "\n";

        # Create temp file with the text
        my $temp_file = "/tmp/ltrs_field_$$.txt";
        open my $fh, '>', $temp_file or die "Cannot create temp file: $!";
        print $fh $value;
        close $fh;

        my $cmd = qq{ltrs check --raw --username="$username" --api-key="$api_key" "$temp_file"};
        my $output = `$cmd 2>&1`;
        my $exit_code = $? >> 8;

        unlink $temp_file;

        if ($exit_code != 0) {
            print colored("    ERROR: Failed to check text\n", 'red');
            print "    $output\n" if $output;
            next;
        }

        if ($output && $output !~ /^\s*$/) {
            eval {
                my $result = decode_json($output);
                my $matches = $result->{matches} || [];
                my $issue_count = scalar @$matches;

                if ($issue_count > 0) {
                    print colored("    Found $issue_count issue(s):\n", 'yellow');
                    $total_issues += $issue_count;

                    for my $match (@$matches) {
                        my $msg = $match->{message} || 'Unknown error';
                        $msg =~ s/[^\x00-\x7F]/?/g;  # Remove non-ASCII

                        my $context = $match->{context}->{text} || '';
                        my $offset = $match->{context}->{offset} || 0;
                        my $length = $match->{context}->{length} || 0;

                        print "      • $msg\n";
                        if ($context) {
                            my $before = substr($context, 0, $offset);
                            my $error = substr($context, $offset, $length);
                            my $after = substr($context, $offset + $length);
                            my $display_text = substr($before . colored($error, 'red bold') . $after, 0, 100);
                            # Remove non-ASCII characters to avoid encoding issues
                            $display_text =~ s/[^\x00-\x7F]/?/g;
                            print "        $display_text\n";
                        }

                        if ($match->{replacements} && @{$match->{replacements}}) {
                            my @all_suggestions = map { $_->{value} } @{$match->{replacements}};
                            my @suggestions = @all_suggestions[0..min(2, $#all_suggestions)];
                            # Clean suggestions too
                            @suggestions = map { s/[^\x00-\x7F]/?/gr } @suggestions;
                            print "        Suggestions: " . join(', ', @suggestions) . "\n" if @suggestions;
                        }
                    }
                } else {
                    print colored("    ✓ No issues\n", 'green') unless $quiet;
                }
            };
            if ($@) {
                print colored("    ERROR: Failed to parse output: $@\n", 'red');
                print "    Raw output: " . substr($output, 0, 200) . "\n";
            }
        } else {
            print colored("    ✓ No issues\n", 'green') unless $quiet;
        }
    }
    print "\n";
}

print "=" x 50 . "\n";
print "Summary:\n";
print "Field paths checked: $fields_checked\n";
print "Total issues found: $total_issues\n";

if ($total_issues == 0) {
    print colored("🎉 All text fields are clean!\n", 'green bold');
} else {
    print colored("⚠️  Found issues that need attention\n", 'yellow bold');
}
