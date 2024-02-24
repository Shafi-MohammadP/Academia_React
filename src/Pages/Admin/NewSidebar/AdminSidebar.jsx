import React from "react";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";

function AdminSidebar() {
  return (
    <>
      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default AdminSidebar;
