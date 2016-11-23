=== Jasmine Test Runner ===
Contributors: timph
Tags: jasmine, js unit test, unit tests, javascript testing
Requires at least: 4.0
Tested up to: 4.6
Stable tag: 0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Run Jasmine tests right inside of your WordPress admin.

== Description ==

Jasmine Test Runner allows you to run Jasmine unit tests from right inside of your WordPress admin area.

== Installation ==

You can use the built in installer and upgrader, or you can install the plugin
manually.

= From your WordPress dashboard =

1. Visit 'Plugins > Add New'
2. Search for 'Jasmine Test Runner'
3. Activate Jasmine Test Runner from your Plugins page.

= From WordPress.org =

1. Download Jasmine Test Runner.
2. Upload the .zip file in the 'Plugins > Add New' page, or copy the unzipped directory to your '/wp-content/plugins/' directory, using your favorite method (ftp, sftp, scp, etc...)
3. Activate Jasmine Test Runner from your Plugins page.

= Once Activated =

You can begin running your Jasmine tests as needed.  Just add a query arg to your URL like this:

?jtrunner=/path/to/tests

Path/to/tests can have a leading or a trailing slash for the directory.  This directory is relative to /wp-content/ directory, so that themes and plugins can utilize the test runner.  The directory should contain only your jasmine tests as it will enqueue all *.js files located in that directory.

== Frequently Asked Questions ==

Q: How do I use Jasmine Test Runner?
A: The simplest way to utilize it is by adding a query arg to your URL that contains the path to your tests.

Example:
example.com/post.php?post=16102&jtrunner=/plugins/jasmine-test-runner/tests/
- /plugins/jasmine-test-runner/tests is the relative path from your /wp-content/ directory.

Q: Can my plugin provide tests that will always run when plugin is activated?
A: Yes!  All settings for the plugin are configured with the 'jasmine_test_runner' WordPress filter.

This shows an example of adding specific unit tests that your plugin would run if a user has Jasmine Test Runner enabled:

/**
 * This will load a set of unit tests located in 
 * a plugin's /tests/ directory.
 */
function add_unit_tests( $settings ) {
    $files = array();
    foreach ( glob( __DIR__ . '/tests/*.js' ) as $filename ) {
        $file = basename( $filename );
        $files[] = plugins_url( "tests/{$file}", __FILE__ );
    }

    $settings['tests'] = array_merge( $settings['tests'], $files );

    return $settings;
}

add_filter( 'jasmine_test_runner', 'add_unit_tests' );


Q: Can I force the test runner to load on a specific set of pages?
A: Definitely!  You may want to have the test runner load everytime on a certain page or section the admin, so this is an example of overriding that setting as well:

/**
 * This will load the Jasmine test runner on a page called
 * 'toplevel_page_boldgrid-inspirations'.
 */
function load_inspirations_jtrunner( $settings ) {
    $settings['loads_in'] = array_merge( $settings['loads_in'], array( 'toplevel_page_boldgrid-inspirations' ) );
    return $settings;
}

add_filter( 'jasmine_test_runner', 'load_inspirations_jtrunner' );

Q: What if I would like to have the test runner always running, and not append a query string to the URL each time?
A: This can also be done, but keep in mind that running it all the time, and having multiple tests running can cause negative performance impacts.

/**
 * This forces Jasmine Test Runner to always run in admin.
function force_load_jtrunner( $settings ) {
    $settings['loads_in'] = array( 'all' );
    return $settings;
}

add_filter( 'jasmine_test_runner', 'force_load_jtrunner' );

Q: How can I force the tests to run randomly?
A: Jasmine Test Runner can run the tests in random order by adding &random=true to your query string.

Q: A random seed has failed, how do I recall that test?
A: The seed number and seed URL are displayed in the Jasmine Test Runner status bar when you've selected to run random or a seed.  For failed tests the bar appears red.  If you need to obtain this seed programatically, .jasmine-seed-bar class contains the link to run the seed, and the link text is the seed number.

Q: Our project uses it's own seed generation for random tests, how do I implement this?
A: If you wish to use your own seed generatator algorithm, you can specify the resulting seed directly by appending &seed=YOUR_SEED.  Where YOUR_SEED is, should be the resulting seed you've generated.

== Changelog ==

= 0.1 =
* Initial commit.