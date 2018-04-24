/*
 * Copyright (c) 2018-present the original author or authors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package org.codingtoy.ouip.utils;

import org.codingtoy.ouip.CoreException;

/**
 * Assertion utility class that assists in validating arguments.
 * 
 * @author 7cat
 * @since 1.0
 */
public final class Assert {

	/**
	 * Assert that an object is not {@code null}.
	 * 
	 * @param object the object to check
	 * @param errorCode the exception error code to use if the assertion fails
	 * @param errorMessage the exception error message to use if the assertion fails
	 * @throws CoreException if the object is {@code null}
	 */
	public static final void notNull(Object object, String errorCode, String errorMessage) {
		if (object == null) {
			throw new CoreException(errorCode, errorMessage);
		}
	}

	/**
	 * Assert that an object is not {@code null}.
	 * 
	 * @param object the object to check
	 * @param errorCode the exception error code to use if the assertion fails
	 * @throws CoreException if the object is {@code null}
	 */
	public static final void notNull(Object object, String errorCode) {

		notNull(object, errorCode, null);
	}
}
