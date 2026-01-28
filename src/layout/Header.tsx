import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import ImgLogo from "@/assets/img_logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  // header 높이
  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;

    const updateHeaderHeight = () => {
      const height = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate("/signin", { replace: true });
  };

  return (
    <header
      id="header"
      className="bottom-shadow fixed top-0 z-9999 flex w-full flex-wrap justify-between bg-white px-5 py-8 md:static md:px-25"
    >
      <Link to="/" className="mb-2 md:mb-0">
        <h1 className="sr-only">빅스페이먼츠</h1>
        <img src={ImgLogo} alt="빅스페이먼츠 로고" />
      </Link>
      <div>
        {user && (
          <span className="text-dark-gray md:after:bg-light-gray relative mr-5 pr-5 after:right-0 after:h-3 md:after:absolute md:after:top-1/2 md:after:w-px md:after:-translate-y-1/2 md:after:content-['']">
            {user.name} {user.username}
          </span>
        )}
        <button onClick={handleLogout} className="text-dark-gray">
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
