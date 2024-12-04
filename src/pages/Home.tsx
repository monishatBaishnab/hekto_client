import { Button } from "@/components/ui/button";
import { PiIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="">
      <h1 className="text-rose-600 ">This is Home Component</h1>
      <Button variant='rose' className=""><PiIcon /> Button</Button>
    </div>
  );
};

export default Home;