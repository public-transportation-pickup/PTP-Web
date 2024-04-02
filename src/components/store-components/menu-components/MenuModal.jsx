import PropTypes from 'prop-types'
import { X } from "react-feather"

export default function MenuModal({ open, onClose, children }) {
    return (
        // backdrop
        <div
          onClick={onClose}
          className={`
            fixed absolute top-0 right-0 h-full  flex justify-center items-center transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
          `}
        >
          {/* modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              bg-white rounded-xl shadow p-6 transition-all h-full
              ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            >
              <X />
            </button>
            {children}
          </div>
        </div>
      )
}

MenuModal.propTypes={
    open:PropTypes.bool,
    onClose:PropTypes.func,
    children:PropTypes.any
}
