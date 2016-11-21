<?php
/**
 * Jasmine_Test_Runner.
 *
 * @package JasmineTestRunner
 */

/**
 * Class Jasmine_Test_Runner.
 */
class Jasmine_Test_Runner {

	/**
	 * Add hooks/filters for plugin.
	 *
	 * @since 0.1
	 */
	public function __construct() {
		$settings = array(
			'loads_in' => array(),
			'tests' => array(),
			'deps' =>  array( 
				'jquery',
				'underscore',
			),
		);
		$this->settings = apply_filters( 'jasmine_test_runner', $settings );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	public function enqueue( $hook ) {
		$setting = $this->settings['loads_in'];
		if ( in_array( $hook, $setting ) || $setting === array( 'all' ) || isset( $_GET['jtrunner'] ) ) {
			self::scripts( $hook );
			self::styles( $hook );
		}
	}

	/**
	 * Jasmine Test Runner Styles.
	 *
	 * @since 0.1
	 */
	private function styles( $hook ) {
		wp_enqueue_style( 'jasmine-css', plugins_url( '/assets/css/jasmine.css', __FILE__ ) );
		wp_enqueue_style( 'jasmine-test-runner-css', plugins_url( '/assets/css/jasmine-test-runner.css', __FILE__, array( 'jasmine-css' ) ) );
	}

	/**
	 * Jasmine Test Runner Scripts.
	 *
	 * @since 0.1
	 */
	private function scripts( $hook ) {
		$setting = $this->settings['loads_in'];

		if ( in_array( $hook, $setting ) || $setting === array( 'all' ) || isset( $_GET['jtrunner'] ) ) {
			wp_enqueue_script( 'jasmine', plugins_url( 'assets/js/jasmine.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_script( 'jasmine-html', plugins_url( 'assets/js/jasmine-html.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_script( 'jasmine-boot', plugins_url( 'assets/js/boot.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_script( 'jasmine-test-runner', plugins_url( 'assets/js/jasmine-test-runner.js', __FILE__ ), array( 'jquery' ) );
			self::tests();
		}
	}

	/**
	 * Enqueue Tests to run.
	 *
	 * @since 0.1
	 */
	private function tests() {
		$tests = $this->settings['tests'];

		// Use provided test directory if passed in.
		if ( isset( $_GET['jtrunner'] ) && ! empty( $_GET['jtrunner'] ) ) {
			$dir = trailingslashit( ltrim( $_GET['jtrunner'], '/' ) );
			$test_path = WP_CONTENT_DIR . "/$dir";
			$files = array();
			// Check provided test dir for js files.
			foreach ( glob( "{$test_path}/*.js" ) as $filename ) {
				$file = basename( $filename );
				$files[] = content_url( "/{$dir}{$file}" );
			}
			$tests = $files;
		}

		// Default deps which shouldn't be overridden by filter.
		$jtrunner_deps = array( 
			'jasmine',
			'jasmine-boot',
			'jasmine-html',
			'jasmine-test-runner'
		);

		// Add any deps that were supplied in the filter override.
		$deps = array_unique( array_merge( $jtrunner_deps, $this->settings['deps'] ) );

		// Load each of the tests with all deps provided.
		foreach ( $tests as $test ) {
			wp_enqueue_script( 'jtr-' . strtolower( $test ), $test, $this->settings['deps'] );
		}
	}
}
