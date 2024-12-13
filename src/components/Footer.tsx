import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { categories, customer_cares, pages } from "@/constants/footer.constants";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#EEEFFB]">
        <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-6">
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
            <div className="flex max-w-[370px] items-center rounded-sm bg-white/45 p-0.5">
              <Input
                placeholder="Enter Email Address"
                className="hidden w-full rounded-none border-0 !shadow-none !outline-none !ring-0 sm:flex"
              />
              <Button variant="rose" className="rounded-[3px]">
                Sign Up
              </Button>
            </div>
            <div className="space-y-2 text-athens-gray-600">
              <p>Contact Info</p>
              <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
            </div>
          </div>
          <div className="space-y-7">
            <h4 className="text-xl font-semibold text-h-black">Categories</h4>
            <div className="space-y-4">
              {categories?.map((category) => (
                <Link
                  className="block text-athens-gray-600 transition-all hover:text-rose-600"
                  key={category.key}
                  to="/"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <h4 className="text-xl font-semibold text-h-black">Customer Care</h4>
            <div className="space-y-4">
              {customer_cares?.map((care) => (
                <Link
                  className="block text-athens-gray-600 transition-all hover:text-rose-600"
                  key={care.key}
                  to="/"
                >
                  {care.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <h4 className="text-xl font-semibold text-h-black">Pages</h4>
            <div className="space-y-4">
              {pages?.map((page) => (
                <Link
                  className="block text-athens-gray-600 transition-all hover:text-rose-600"
                  key={page.kay}
                  to="/"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E7E4F8]">
        <div className="container flex items-center justify-between !py-4">
          <p className="text-athens-gray-600">
            <span className="text-rose-600">Hekto</span> - All Rights Reserved
          </p>
          <div className="flex items-center gap-1">
            <Facebook className="size-4 cursor-pointer stroke-dark-blue-600" />
            <Instagram className="size-4 cursor-pointer stroke-dark-blue-600" />
            <Twitter className="size-4 cursor-pointer stroke-dark-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
