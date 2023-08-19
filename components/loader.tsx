import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-full gap-y-4 flex flex-col items-center justify-center">
      <div className="relative h-10 w-10 animate-spin">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-muted-foreground text-sm">Buddy is Thinking ...</p>
    </div>
  );
};

export default Loader;
