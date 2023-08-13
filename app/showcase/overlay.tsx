import { Logo } from '@pmndrs/branding'
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { store } from './store'

export default function Overlay() {
  const snap = useSnapshot(store)

  return (
    <div className="container">
      <header>
        <Logo width="40" height="40" />
        <div>
          <AiOutlineShopping size="3em" />
        </div>
      </header>

      {snap.variant === "intro" ? <Intro /> : <Customizer />}
    </div>
  )
}

function Intro() {
  return (
    <section key="main">
      <div className="section--container">
        <div>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: 'black' }}
              onClick={() => (store.variant = store.variant === "customizer" ? "intro" : "customizer")}>
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Customizer() {
  const colors = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'] as const
  const decals = ['brainly', 'logo_brainly_white', 'logo_brainly-mobile']

  return (
    <section key="custom">
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => store.color = color}
            ></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {decals.map((decal) => (
              <div key={decal} className="decal"
                onClick={() => store.decal = decal}
              >
                <img src={decal + '.png'} alt="brand" />
              </div>
            ))}
          </div>
        </div>
        <button className="share" style={{ background: 'black' }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
        <button
          className="exit"
          style={{ background: 'black' }}
          onClick={() => (store.variant = "intro")}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </section>
  )
}
