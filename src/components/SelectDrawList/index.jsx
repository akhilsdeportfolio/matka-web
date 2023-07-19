import {
  useGetAllGamesQuery,
  usePlacebetMutation,
} from "../../features/api/apiSlice";
import { Button, CheckList, Modal, NavBar, SearchBar } from "antd-mobile";
import MSkeleton from "../Skeleton";
import { useNavigate } from "react-router-dom";
import SelectDrawItem from "../SelectDrawItem";
import { useEffect, useState } from "react";
import "./styles.css";
import BottomBar from "../BottomBar";
import { CheckCircleFill, CheckCircleOutline } from "antd-mobile-icons";
import {
  TbError404,
  TbExclamationCircle,  
} from "react-icons/tb";
import { analytics } from "../../clientFirebase";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../Label";
import { getAmount } from "../../utils/money";
import { logEvent } from "firebase/analytics";
import { addDrawId } from "../../features/draws";

export default function SelectDrawList() {
  const { data, isLoading } = useGetAllGamesQuery();
  const navigate = useNavigate();
  const [copy, setCopy] = useState([]);
  const [loading, setLoading] = useState(false);
  const lines = useSelector((store) => store.lines);
  const [callPlaceBet] = usePlacebetMutation();
  const dispatch=useDispatch();
  const draws= useSelector((store)=>store.draws);

  

  useEffect(() => {
    setCopy(data?.games);
  }, [data, isLoading]);

  function handleSearch(value) {    
    const d = data.games.filter((game) => {
      if (game.productName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setCopy(d);
  }

  async function handleConfirm() {
    setLoading(true);

    callPlaceBet({ lines: lines,draws:draws,drawId:draws[0]})
      .then((resp) => {
        if (resp.error) {
          if (resp?.error?.status === 399) {
            Modal.alert({
              header: (
                <TbError404
                  style={{
                    fontSize: 64,
                    color: "var(--adm-color-warning)",
                  }}
                />
              ),
              title: "Failed to place bet",
              confirmText: "Dismiss",
              content: (
                <>
                  <div className="text-sm p-2">
                    Insufficient funds add amount and try again.
                  </div>
                </>
              ),
              onConfirm: () => {
                setLoading(false);
              },
            });
          }

          if (resp.error.status === 400) {
            Modal.alert({
              header: (
                <TbExclamationCircle
                  style={{
                    fontSize: 64,
                    color: "var(--adm-color-warning)",
                  }}
                />
              ),
              title: "Slect a Draw to proceed",
              confirmText: "Close",
              content: (
                <>
                  <div className="text-sm p-2">You have not selected draw.</div>
                </>
              ),
              onConfirm: () => {
                setLoading(false);
              },
            });
          }
        }
        if (resp.data) {
          logEvent(analytics, "purchase", { amount: getAmount(lines) });
          navigate(`/success/${resp.data._id}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (isLoading) {
    return <MSkeleton active />;
  }

  return (
    <div style={{ padding: 0, overflow: "hidden", maxHeight: "100vh" }}>
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
        className="bg-emerald-500 text-white"
        right={
          <>
            <Button
              type="ghost"
              color="warning"
              className="font-bold text-black"
              size="small"
              onClick={() => {
                navigate("/deposit");
              }}
            >
              Deposit
            </Button>
          </>
        }
      >
        Select Draw
      </NavBar>
      <div className="p-2">
        <SearchBar placeholder="Enter a game name" onChange={handleSearch} />
      </div>

      <div style={{ maxHeight: "82vh", overflow: "scroll" }}>
        <div className="px-4">
          <Label title="Available Games to Play" />
        </div>
        <CheckList
          onChange={(value)=>{            
            dispatch(addDrawId(value));
          }}
          mode="default"
          className="customList"
          multiple={false}
          extra={(active) =>
            active ? <CheckCircleFill /> : <CheckCircleOutline />
          }          
        >
          {copy?.map((game) => {
            return (
              <SelectDrawItem
                key={game._id}
                game={game}
                value={game._id}                
              />
            );
          })}
        </CheckList>
      </div>

      <BottomBar
        primary={handleConfirm}
        primaryText="Confirm"
        disableSecondary
        isLoading={loading}
      />
    </div>
  );
}
