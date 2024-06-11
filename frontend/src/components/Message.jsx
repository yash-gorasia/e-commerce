const Message = ({ variant, children }) => {
    const getVariantClass = () => {
        switch (variant) {
            case "success":
                return "bg-green-100 border-green-400 text-green-700"
            case "error":
                return "bg-red-100 border-red-400 text-red-700"
            default:
                return "bg-blue-100 border-blue-400 text-blue-700"
        }
    }

    return (
        <div className={`border-l-4 p-4 rounded ${getVariantClass()}`}>
            {children}
        </div>
    )

}

export default Message
