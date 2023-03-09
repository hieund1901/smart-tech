export function ContainerPage({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className='container page'>
      <div className='row' style={{ justifyContent: 'center' }}>
        {' '}
        {children}{' '}
      </div>
    </div>
  );
}
