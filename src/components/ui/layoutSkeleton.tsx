const LayoutSkeleton = () => {
    return (
      <div className="h-full flex flex-col gap-4 ">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
          <div className="bg-neutral-700 aspect-video rounded-xl animate-pulse duration-[2000]]" />
          <div className="bg-neutral-700 aspect-video rounded-xl animate-pulse duration-[2000]" />
          <div className="bg-neutral-700 aspect-video rounded-xl animate-pulse duration-[2000]" />
        </div>
        <div className="bg-neutral-700 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-5 animate-pulse duration-[2000]" />
      </div>
    );
  };
  
  export default LayoutSkeleton;