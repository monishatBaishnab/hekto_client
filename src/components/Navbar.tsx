import client_route_config from '@/constants/routes.constants';
import nav_links_generator from '@/utils/nav_links_generator';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  ArrowUp,
  GitCompare,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUser from '@/hooks/useUser';
import NavbarProfile from './NavbarProfile';

// Generate the class names of nav links based on "isActive"
const generate_link_class = (isActive: boolean): string => {
  return isActive
    ? 'text-rose-600'
    : 'text-h-black hover:text-rose-600 transition-all';
};

// Generate The nav links from config

const Navbar = () => {
  const userData = useUser();

  const { role, isLoading, isFetching } = userData;
  let nav_links: {
    label: string;
    path: string;
  }[] = [];

  if (client_route_config) {
    nav_links = nav_links_generator(client_route_config);
  }

  const [scroll, setScroll] = useState(false);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 500);
      setIsScrollTopVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setIsScrollTopVisible(true);
      } else {
        setIsScrollTopVisible(false);
      }
    });

    return () =>
      window.removeEventListener('scroll', () => {
        if (window.scrollY > 300) {
          setIsScrollTopVisible(true);
        } else {
          setIsScrollTopVisible(false);
        }
      });
  }, []);
  return (
    <div className="h-[calc(80px_+_36px)]">
      {/* Top navbar */}
      <div className="bg-electric-violet-600">
        <div className="container flex flex-wrap items-center justify-center gap-2 !py-2 sm:justify-between">
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
            <Link
              className="flex items-center gap-1 text-sm text-white"
              to="/login"
            >
              <GitCompare className="size-4" /> Compere
            </Link>

            <Link
              className="flex items-center gap-1 text-sm text-white"
              to="/cart"
            >
              <ShoppingCart className="size-4" /> Cart
            </Link>

            {!role && (
              <Link
                className="flex items-center gap-1 text-sm text-white"
                to="/login"
              >
                <User className="size-4" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={
          scroll
            ? 'fixed inset-x-0 top-0 z-50 block animate-fadeInDown bg-white/60 backdrop-blur-sm'
            : ''
        }
      >
        <div
          className={`container flex h-20 items-center justify-between !py-0`}
        >
          <div className="flex items-center gap-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 overflow-hidden">
                <img
                  className="size-full object-contain"
                  src="https://i.ibb.co.com/PTSxVm0/hekto-logo.png"
                  alt="Hekto Logo"
                />
              </div>
              <h2 className="text-3xl font-bold text-h-black">Hekto</h2>
            </Link>

            {/* Navbar links */}
            <div className="hidden items-center gap-x-6 lg:flex">
              {nav_links
                ? nav_links?.map((link) => (
                    <NavLink
                      key={`/${link?.path}`}
                      className={({ isActive }) =>
                        `outline-none ${generate_link_class(isActive)}`
                      }
                      to={link.path}
                    >
                      {link.label}
                    </NavLink>
                  ))
                : null}
            </div>
          </div>

          {/* Search bar and buttons */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="flex max-w-[370px] items-center">
              <Input
                placeholder="Search"
                className="hidden w-full rounded-none border border-r-0 border-athens-gray-100 !shadow-none !outline-none !ring-0 sm:flex"
              />
              <Button variant="rose" className="rounded-none">
                <Search />
              </Button>
            </div>
            {/* Small Navbar Dropdown */}
            <div className="block lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Button variant="light" className="size-9">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {nav_links?.map((link) => (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      key={link.label}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Profile Dropdown */}
            {isLoading || isFetching ? (
              <div className="size-9 animate-pulse rounded-full bg-athens-gray-200"></div>
            ) : (
              role && <NavbarProfile />
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div
        className={`fixed right-10 z-50 transition-all duration-300 ${
          isScrollTopVisible
            ? 'visible bottom-10 opacity-100'
            : 'invisible bottom-14 opacity-0'
        }`}
      >
        <Button className="size-9" onClick={scrollToTop}>
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
