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

import org.codingtoy.ouip.domain.Function;
import org.codingtoy.ouip.domain.Menu;
import org.codingtoy.ouip.domain.User;
import org.codingtoy.ouip.vo.MenuTree;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;

/**
 * @author 7cat
 * @since 1.0
 */
public class MenuTreeTest {

	@Test
	public void testGetMenus() {

		// 00
		// 01(叶子) 有权限
		// 02(叶子)
		// 03(叶子) 有权限
		// 10
		// 11(叶子)
		// 20
		// 21
		// 210(叶子) 有权限
		// 22
		// 220(叶子)

		List<Menu> menus = new ArrayList<>();
		Menu menu00 = new Menu();
		menu00.setSequence(0);

		menu00.setId(Long.valueOf(0));
		menus.add(menu00);
		Menu menu01 = new Menu();
		menu01.setId(Long.valueOf(1));
		menu01.setParent(menu00);
		menu01.setSequence(2);
		menu01.setFunction(new Function());
		menus.add(menu01);

		Menu menu02 = new Menu();
		menu02.setSequence(1);
		menu02.setId(Long.valueOf(2));
		menu02.setParent(menu00);
		menu02.setFunction(new Function());
		menus.add(menu02);

		Menu menu03 = new Menu();
		menu03.setSequence(0);
		menu03.setId(Long.valueOf(3));
		menu03.setParent(menu00);
		menu03.setFunction(new Function());
		menus.add(menu03);

		Menu menu10 = new Menu();
		menu10.setId(Long.valueOf(10));
		menu10.setSequence(1);
		menus.add(menu10);

		Menu menu11 = new Menu();
		menu11.setId(Long.valueOf(11));
		menu11.setSequence(0);
		menu11.setParent(menu10);
		menu11.setFunction(new Function());
		menus.add(menu11);

		Menu menu20 = new Menu();
		menu20.setSequence(2);
		menu20.setId(Long.valueOf(20));
		menus.add(menu20);

		Menu menu21 = new Menu();
		menu21.setSequence(0);
		menu21.setId(Long.valueOf(21));
		menu21.setParent(menu20);
		menus.add(menu21);

		Menu menu210 = new Menu();
		menu210.setSequence(0);
		menu210.setId(Long.valueOf(210));
		menu210.setParent(menu21);
		menu210.setFunction(new Function());
		menus.add(menu210);

		Menu menu22 = new Menu();
		menu22.setSequence(1);
		menu22.setId(Long.valueOf(22));
		menu22.setParent(menu20);
		menus.add(menu22);

		Menu menu220 = new Menu();
		menu220.setSequence(0);
		menu220.setId(Long.valueOf(220));
		menu220.setParent(menu22);
		menu220.setFunction(new Function());
		menus.add(menu220);

		User user = Mockito.mock(User.class);

		Mockito.when(user.isAuthorized(menu01)).thenReturn(true);
		Mockito.when(user.isAuthorized(menu03)).thenReturn(true);
		Mockito.when(user.isAuthorized(menu210)).thenReturn(true);
		MenuTree tree = new MenuTree(user, menus);
		Assert.assertEquals(2, tree.getMenus().size());

		Assert.assertEquals(menu00, tree.getMenus().get(0));
		Assert.assertEquals(2, tree.getMenus().get(0).getChildren().size());
		Assert.assertEquals(menu03, tree.getMenus().get(0).getChildren().get(0));
		Assert.assertEquals(menu01, tree.getMenus().get(0).getChildren().get(1));
		Assert.assertEquals(menu20, tree.getMenus().get(1));
		Assert.assertEquals(1, tree.getMenus().get(1).getChildren().size());
		Assert.assertEquals(menu21, tree.getMenus().get(1).getChildren().get(0));
		Assert.assertEquals(menu210, tree.getMenus().get(1).getChildren().get(0).getChildren().get(0));
	}

}
