// public function
export function getEl<T>(ref: any): T {
  return ref && ref.current ? ref.current : null;
}