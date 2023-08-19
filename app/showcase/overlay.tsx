import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { store } from './store'
import { AnimatePresence, motion } from 'framer-motion'


const transition = { type: 'spring', duration: 0.8 }

const config = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
}

export default function Overlay() {
  const snap = useSnapshot(store)

  return (
    <div className="container">
      <header>
        <img className="logo" src='/brainly.png' alt="brainly" />
      </header>
      <AnimatePresence


      >

        {snap.variant === "intro" ? <Intro key="intro"
          config={config}
        /> : <Customizer key="customizer" />}
      </AnimatePresence>
    </div>
  )
}

function Intro({ config }: { config: any }) {
  return (
    <motion.section
      {...config}
    >
      <div className="section--container">
        <div>
          <h1>{`LET'S BUY IT.`}</h1>
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
    </motion.section>
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
        <button className="share" style={{ background: 'black' }}
          onClick={() => {
            // const link = document.createElement('a')
            // const canvas = document.querySelector('canvas')


            // link.setAttribute("download", `${store.decal}.png`)

            // link.setAttribute(
            //   'href',
            //   canvas.toDataURL("image/png").replace('image/png', 'image/octet-stream')
            // )

            // link.click()
            // console.log(canvas, link)


          }}

        >
          Add to Cart
          <AiOutlineShopping size="1.3em" />
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
