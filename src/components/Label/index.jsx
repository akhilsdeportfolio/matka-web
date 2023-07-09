/* eslint-disable react/prop-types */
export const Label = ({ title,textRight=false,children}) => (
  <div style={{ padding:0}}>
    <p className={`mb-2 text-xs font-bold ${textRight ? "text-end":""}`} style={{color:'var(--adm-color-weak)'}}>{title}</p>
    {children}
  </div>
);
