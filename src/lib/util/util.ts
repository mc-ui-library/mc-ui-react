// public function
export function getEl<T>(ref: any): T {
  return ref && ref.current ? ref.current : null;
}

export function addThemeCls(cls: string[], theme: string[] = []) {
  if (theme && theme.length) {
    const compCls = cls[0].replace('mc-', '');
    theme.forEach((t: string) => cls.push(compCls + '-' + t));
  }
  return cls;
}

