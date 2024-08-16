interface InputProps {
    type: string,
    name: string,
    text: string,
    value: any,
    onChange: any
}

const FormInput: React.FC<InputProps> = ({ type, name, text, value, onChange }) => {
    return (
        <div className='input-holder'>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
                className='form-input'
            />
        </div>
    )
}

export default FormInput;