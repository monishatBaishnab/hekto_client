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
                  className="w-full h-full object-contain"
                  src="/public/hekto-logo.png"
                  alt="Hekto Logo"
                />
              </div>
              <h2 className="text-h-black text-3xl font-bold">Hekto</h2>
            </Link>
            <div className="max-w-[370px] flex items-center bg-white/45 p-0.5 rounded-sm">
              <Input
                placeholder="Enter Email Address"
                className="hidden sm:flex w-full !outline-none !ring-0 border-0 rounded-none !shadow-none"
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
            <h4 className="text-xl text-h-black font-semibold">Categories</h4>
            <div className="space-y-4">
              {categories?.map((category) => (
                <Link
                  className="block text-athens-gray-600 hover:text-rose-600 transition-all"
                  key={category.key}
                  to="/"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <h4 className="text-xl text-h-black font-semibold">Customer Care</h4>
            <div className="space-y-4">
              {customer_cares?.map((care) => (
                <Link
                  className="block text-athens-gray-600 hover:text-rose-600 transition-all"
                  key={care.key}
                  to="/"
                >
                  {care.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <h4 className="text-xl text-h-black font-semibold">Pages</h4>
            <div className="space-y-4">
              {pages?.map((page) => (
                <Link
                  className="block text-athens-gray-600 hover:text-rose-600 transition-all"
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
        <div className="container !py-4 flex items-center justify-between">
          <p className="text-athens-gray-600">
            <span className="text-rose-600">Hekto</span> - All Rights Reserved
          </p>
          <div className="flex items-center gap-1">
            <Facebook className="size-4 stroke-dark-blue-600 cursor-pointer" />
            <Instagram className="size-4 stroke-dark-blue-600 cursor-pointer" />
            <Twitter className="size-4 stroke-dark-blue-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
