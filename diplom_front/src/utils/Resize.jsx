import { useEffect, useState } from "react";

const Resize = () => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    const getSize = () => setSize(window.innerWidth);
    getSize();
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  }, []);

  return size;
};

export default Resize;
