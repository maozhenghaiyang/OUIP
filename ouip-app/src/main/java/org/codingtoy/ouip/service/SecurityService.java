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

package org.codingtoy.ouip.service;

import org.codingtoy.ouip.domain.Role;
import org.codingtoy.ouip.domain.User;
import org.codingtoy.ouip.vo.Session;

/**
 * 认证及鉴权服务.
 * 
 * @author 7cat
 * @since 1.0
 */
public interface SecurityService {

	/**
	 * 用户鉴权.
	 * 
	 * @param user 被鉴权的用户
	 * @return 当前鉴权的会话
	 */
	Session authentication(User user);

	/**
	 * 为用户分配角色.
	 * 
	 * @param user 被分配角色的用户
	 * @param roleIds 分配的角色列表
	 */
	void authorization(User user, Long... roleIds);

	/**
	 * 为角色分配功能.
	 * 
	 * @param role 被分配的角色
	 * @param functionIds 分配的功能点列表
	 */
	void authorization(Role role, Long... functionIds);
}
