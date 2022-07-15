import {ToastPosition} from "@customTypes/index";
import React, {FC, ReactNode} from "react";
import StyledToastList from "./ToastList.styled";

interface ToastListProps {
	children: ReactNode;
	position: ToastPosition;
}

const ToastList: FC<ToastListProps> = ({position, children}) => (
	<StyledToastList position={position}>{children}</StyledToastList>
);

export default ToastList;
