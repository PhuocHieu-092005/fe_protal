const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-10">
      <div className="flex-1">
        <a className="text-xl font-bold text-primary">DATN_PORTAL</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li><a>Trang chủ</a></li>
          <li className="hidden md:block"><a>Việc làm</a></li>
          <li><button className="btn btn-primary btn-sm ml-2">Đăng nhập</button></li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;