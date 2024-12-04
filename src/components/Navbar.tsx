import client_route_config from "@/constants/routes.constants";
import nav_links_generator from "@/utils/nav_links_generator";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUp, GitCompare, Mail, Menu, Phone, Search, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

// Generate the class names of nav links based on "isActive"
const generate_link_class = (isActive: boolean): string => {
  return isActive ? "text-rose-600" : "text-h-black hover:text-rose-600 transition-all";
};

// Generate The nav links from config
const nav_links = nav_links_generator(client_route_config);

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 500);
      setIsScrollTopVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsNavbarVisible(false);
      }
    };

    if (mediaQuery.matches) {
      setIsNavbarVisible(false);
    }

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setIsScrollTopVisible(true);
      } else {
        setIsScrollTopVisible(false);
      }
    });

    return () =>
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 300) {
          setIsScrollTopVisible(true);
        } else {
          setIsScrollTopVisible(false);
        }
      });
  }, []);
  return (
    <>
      <div>
        {/* Top navbar */}
        <div className="bg-electric-violet-600">
          <div className="container !py-0 h-11 flex items-center justify-between">
            {/* mail & phone */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-sm text-white">
                <Mail className="size-4" />
                <span>hektosh@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <Phone className="size-4" />
                <span>(12345)67890</span>
              </div>
            </div>

            {/* login, compere, cart, etc */}
            <div className="flex items-center gap-3">
              <Link className="flex items-center gap-1 text-white text-sm" to="/login">
                <GitCompare className="size-4" /> Compere
              </Link>
              <Link className="flex items-center gap-1 text-white text-sm" to="/login">
                <ShoppingCart className="size-4" /> Cart
              </Link>
              <Link className="flex items-center gap-1 text-white text-sm" to="/login">
                <User className="size-4" /> Login
              </Link>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className={scroll ? "fixed animate-fadeInDown z-50 top-0 left-0 right-0 block" : ""}>
          <div className={`container !py-0 h-20 flex items-center justify-between`}>
            <div className="flex items-center gap-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div className="size-8 overflow-hidden">
                  <img
                    className="w-full h-full object-contain"
                    src="/public/hekto-logo.png"
                    alt="Hekto Logo"
                  />
                </div>
                <h2 className="text-h-black text-3xl font-bold">Hekto</h2>
              </Link>

              {/* Navbar links */}
              <div className="flex items-center gap-x-6">
                {nav_links?.map((link) => (
                  <NavLink
                    key={link?.path}
                    className={({ isActive }) => `outline-none ${generate_link_class(isActive)}`}
                    to={link.path}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Search bar and buttons */}
            <div className="flex items-center gap-5">
              {/* Search */}
              <div className="max-w-[370px] flex items-center">
                <Input
                  placeholder="Search"
                  className="w-full !outline-none !ring-0 border border-athens-gray-100 border-r-0 rounded-none !shadow-none"
                />
                <Button variant="rose" className="rounded-none">
                  <Search />
                </Button>
              </div>
              {/* Bars and profile */}

              <Button variant={"light"} className=" size-9">
                <Menu />
              </Button>
              <Avatar className="size-9 block overflow-hidden rounded-full cursor-pointer">
                <AvatarImage
                  className="w-full h-full object-cover"
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed right-10 z-50 transition-all duration-300 ${
          isScrollTopVisible ? "bottom-10 visible opacity-100" : "bottom-14 invisible opacity-0"
        }`}
      >
        <Button className="size-9" onClick={scrollToTop}>
          <ArrowUp />
        </Button>
      </div>
    </>
  );
};

export default Navbar;
