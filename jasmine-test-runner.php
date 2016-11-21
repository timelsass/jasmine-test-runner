<?php
/**
 * Plugin Name: Jasmine Test Runner
 * Plugin URI: http://tim.ph
 * Description: Run your jasmine tests in WordPress
 * Version: 0.1
 * Author:  Tim Elsass
 * Author URI: http://tim.ph/
 * License: GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (c) 2016 Tim Elsass (http://tim.ph/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * @package JasmineTestRunner
 */

require_once __DIR__ . '/class-jasmine-test-runner.php';
$jasmine_test_runner = new Jasmine_Test_Runner();
