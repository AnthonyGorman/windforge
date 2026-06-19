/** Strip the styling escape hatch. Applied to every component except the
 *  layout/building-block primitives (Box, Stack, Grid). */
export type NoStyle<T> = Omit<T, 'className' | 'style'>
