import { PropsWithChildren } from "react";
import { Button as NativeButton, ButtonProps, Text } from "react-native";

type Props = ButtonProps

export default function Button({ ...buttonProps }: Props) {
    return (
        <NativeButton {...buttonProps} />
    )
}
