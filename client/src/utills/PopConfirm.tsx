import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import React, { PropsWithChildren } from "react";


type Props = {
  title: string
  children: React.ReactNode
  onConfirm: (value: string) => void
}
export default function App(props : Props) {
  return (
    <Popover placement="bottom" showArrow offset={10} color="primary">
      <PopoverTrigger>
        {props.children}
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <>
          <div className="p-5 w-full">
             <>{props.title}</>
            
          </div>
          <div className="flex gap-2 p-5">
           <Button color="secondary">No</Button>
           <Button color="primary">Yes</Button></div> </>
        )}
      </PopoverContent>
    </Popover>
  );
}