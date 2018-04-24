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

package org.codingtoy.ouip.service.impl;

import org.codingtoy.ouip.common.ErrorCodes;
import org.codingtoy.ouip.domain.MenuRepository;
import org.codingtoy.ouip.domain.Role;
import org.codingtoy.ouip.domain.User;
import org.codingtoy.ouip.domain.UserRepository;
import org.codingtoy.ouip.service.SecurityService;
import org.codingtoy.ouip.utils.Assert;
import org.codingtoy.ouip.vo.MenuTree;
import org.codingtoy.ouip.vo.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author 7cat
 * @since 1.0
 */
@Component
public class DefaultSecurityService implements SecurityService {

	@Autowired
	private MenuRepository menuRepository;

	@Autowired
	private UserRepository userRepository;

	@Value("${token.key}")
	private String key;

	@Override
	public Session authentication(User user) {
		user = userRepository.findOneByUsernameAndPassword(user.getUsername(), user.getPassword());
		Assert.notNull(user, ErrorCodes.USER_OR_PASSWORD_ERROR);
		MenuTree menuTree = new MenuTree(user, menuRepository.findAll());
		// TODO 后续补充增加生成 token 的规则
		return new Session(key, user, menuTree);
	}

	@Override
	public void authorization(User user, Long... roleIds) {
		
	}

	@Override
	public void authorization(Role role, Long... functionIds) {
	}

	public void setMenuRepository(MenuRepository menuRepository) {
		this.menuRepository = menuRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
