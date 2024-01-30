export default function Orbit() {
  return (
    <div className="orbit-container">
      <div className="solar-system">
        <div title="Earth" className="venus-orbit orbit">
          <div title="Earth" className="planet venus">
            <div title="Moon" className="moon-orbit orbit">
              <div title="Moon" className="moon"></div>
            </div>
          </div>
          <div title="Venus" className="new-orbit orbit">
            <div title="Venus" className="planet new"></div>
            <div title="Mercury" className="earth-orbit orbit">
              <div title="Mercury" className="planet earth"></div>
              <div title="Sun" className="sun"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
