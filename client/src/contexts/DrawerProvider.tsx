import { Context, createContext, ReactNode, useCallback, useContext, useState } from "react"

type BackdropContext = {
    open: () => any
    close: () => any
    toggle: () => any
    isOpen: boolean
}

// @ts-ignore
const MyContext: Context<BackdropContext> = createContext(null)

type Props = {
    children?: ReactNode
}
export function DrawerProvider({ children }: Props) {
    const [$open, setOpen] = useState(false)

    const open = useCallback(() => setOpen(true), [])
    const close = useCallback(() => setOpen(false), [])
    const toggle = useCallback(() => setOpen(prev => !prev), [])

    return (
        <MyContext.Provider
            value={{
                isOpen: $open,
                close,
                open,
                toggle
            }}
        >{children}</MyContext.Provider>
    )
}

export const useDrawer = () => useContext(MyContext)