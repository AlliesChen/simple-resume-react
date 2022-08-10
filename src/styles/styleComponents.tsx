const expContainerAttr = {
    mx: 12,
    my: 6,
    p: 4,
    maxW: "3xl"
}

const onEditExpContainerAttr = Object.assign({}, expContainerAttr, {
    _hover: { border: "1px", borderColor: "gray.400", },
    borderRadius: "lg",
})

export{expContainerAttr, onEditExpContainerAttr}