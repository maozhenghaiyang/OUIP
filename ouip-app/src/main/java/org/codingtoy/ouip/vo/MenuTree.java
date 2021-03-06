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

package org.codingtoy.ouip.vo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.codingtoy.ouip.domain.Menu;
import org.codingtoy.ouip.domain.User;

/**
 * UI 中展现的菜单树值对象.
 * 
 * @author 7cat
 * @since 1.0
 */
public class MenuTree {

	private List<Menu> menus = new ArrayList<>();

	public MenuTree(User user, List<Menu> menus) {
		Map<Long, Menu> menuMapping = menus.stream().collect(Collectors.toMap(Menu::getId, m -> m));
		menus.stream().forEach(m -> {
			if (m.getParent() != null) {
				if (m.isLeaf()) {
					if (user.isAuthorized(m)) {
						menuMapping.get(m.getParent().getId()).addChildren(m);
					}
				}
				else {
					menuMapping.get(m.getParent().getId()).addChildren(m);
				}
			}
		});
		this.menus = menus.stream().filter(Menu::isRoot).filter(Menu::containsLeafChildren).sorted().collect(
				Collectors.toList());
	}

	public List<Menu> getMenus() {
		return menus;
	}
}
