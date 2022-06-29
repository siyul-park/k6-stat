function arrayUnion<ArgumentsType extends readonly unknown[]>(
  ...arguments_: readonly ArgumentsType[]
): ArgumentsType {
  return [...new Set(arguments_.flat())] as unknown as ArgumentsType;
}

export default arrayUnion;
