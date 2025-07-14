
import { HTMLProps } from "react";

export function TextArea({...rest}: HTMLProps<HTMLTextAreaElement>){
    return (<textarea className=" w-full h-[180px] bg-white outline-0 resize-none rounded-sm p-[8px]" {...rest} />
    )
}