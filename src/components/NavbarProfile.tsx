import { LogOut, LucideProps } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useUser from '@/hooks/useUser';
import { logout } from '@/redux/features/auth/auth.slice';
import { clearCart } from '@/redux/features/cart/cart.slice';
import { clearRecent } from '@/redux/features/recent/recent.slice';
import { useAppDispatch } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';
import {
  user_profile_links,
  admin_profile_links,
} from '@/constants/navbar.constants';

type TLink = {
  label: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};

const NavbarProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useUser();

  let profile_links: TLink[] = [];

  const { name, profilePhoto, role } = userData;

  if (role == 'CUSTOMER') {
    profile_links = user_profile_links;
  } else if (role === 'VENDOR' || role === 'ADMIN') {
    profile_links = admin_profile_links;
  }

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(clearRecent());

    if (!role) {
      return navigate('/login');
    } else if (role) {
      // Then, log out the user after invalidating the cache
      dispatch(logout());

      // Optionally, redirect to another page after logout
      navigate('/login');
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="block size-9 cursor-pointer overflow-hidden rounded-full border border-athens-gray-100 ">
          <AvatarImage
            className="size-full object-cover"
            src={
              profilePhoto ??
              'https://i.ibb.co.com/TPKTRBc/istockphoto-1300845620-612x612.jpg'
            }
            alt={name}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profile_links?.map(({ path, label, icon: Icon }) => (
          <DropdownMenuItem
            key={path}
            onClick={() => navigate(path)}
            className="cursor-pointer"
          >
            <Icon /> {label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-torch-red-600 focus:bg-torch-red-100 focus:text-torch-red-600"
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarProfile;
