import classNames from 'classnames'

const PageContainer = ({ children, className }) => {
    return (
        <div className={classNames("d-flex flex-column align-items-center gap-3 pt-3 mb-5", className)}>
            {children}
        </div>
    )
}

export default PageContainer