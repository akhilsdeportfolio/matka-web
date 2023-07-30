


import { Dropdown, Radio, Space } from 'antd-mobile';
import  { useRef } from 'react'
import { MdTranslate } from 'react-icons/md';
import i18n from '../../../i18next';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
const {t}=useTranslation();
const ref=useRef();
  return (
    <div style={{ margin: "0px", overflow: "hidden" }}>
        <div>
          <div className="flex flex-row justify-between items-center bg-emerald-600">
            <div className="px-4 p-2">
              <img height={40} width={64} src="/logo.png" />
            </div>
            <div className="mx-2 flex flex-row items-center">              
              <div>
                <Dropdown style={{ backgroundColor: "transparent" }} ref={ref}>
                  <Dropdown.Item
                    key="sorter"
                    className="custom"
                    title={<MdTranslate style={{ color: "white" }} />}
                  >
                    <div style={{ padding: 12 }}>
                      <Radio.Group
                        defaultValue={i18n.language}
                        onChange={(value) => {
                          localStorage.setItem('language',value);
                          i18n.changeLanguage(value);
                          ref.current.close();
                        }}
                      >
                        <Space direction="vertical" block>
                          <Radio block value="hi" key="hi">
                            हिंदी
                          </Radio>
                          <Radio block value="en" key="en">
                            English
                          </Radio>
                          <Radio block value="te" key="te">
                            తెలుగు
                          </Radio>
                          <Radio block value="kn" key="kn">
                            ಕನ್ನಡ
                          </Radio>
                          <Radio block value="ta" key="ta">
                            தமிழ்
                          </Radio>
                          <Radio block value="ml" key="ml">
                            മലയാളം
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        </div>
  )
}
