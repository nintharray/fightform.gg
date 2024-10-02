import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { Config, GameModeConfig, Button, ButtonRemap } from "haybox-webserial";

interface KeyProps {
  id: string;
  keyName: string;
  onClick: (id: string) => void;
  isActive: boolean;
}

const Key: React.FC<KeyProps> = ({ id, keyName, onClick, isActive }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      className={`w-16 h-16 mx-1 border transition-colors duration-100 ${isActive ? "border-blue-500 scale-105" : "border-zinc-300"} rounded-md flex justify-center items-center`}
    >
      {(() => {
        switch (keyName) {
          case "Right":
            return (
              <img
                src="https://www.ssbwiki.com/images/1/17/ButtonIcon-GCN-Control_Stick-R.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "Left":
            return (
              <img
                src="https://www.ssbwiki.com/images/8/81/ButtonIcon-GCN-Control_Stick-L.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "Up":
            return (
              <img
                src="https://www.ssbwiki.com/images/3/39/ButtonIcon-GCN-Control_Stick-U.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "Down":
            return (
              <img
                src="https://www.ssbwiki.com/images/e/ed/ButtonIcon-GCN-Control_Stick-D.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "C-Right":
            return (
              <img
                src="https://www.ssbwiki.com/images/2/27/ButtonIcon-GCN-C-Stick-R.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "C-Left":
            return (
              <img
                src="https://www.ssbwiki.com/images/f/f0/ButtonIcon-GCN-C-Stick-L.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "C-Up":
            return (
              <img
                src="https://www.ssbwiki.com/images/b/bb/ButtonIcon-GCN-C-Stick-U.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          case "C-Down":
            return (
              <img
                src="https://www.ssbwiki.com/images/f/fb/ButtonIcon-GCN-C-Stick-D.svg"
                alt={keyName}
                draggable={false}
                className="select-none"
              />
            );
          default:
            return (
              <p className="text-zinc-300 font-bold text-lg select-none">
                {keyName}
              </p>
            );
        }
      })()}
      {isActive ? true : false}
    </div>
  );
};

interface ControllerKeyProps {
  id: string;
  value: string;
  onClick: (label: string) => void;
  isActive: boolean;
}

const ControllerKey: React.FC<ControllerKeyProps> = ({
  id,
  value,
  onClick,
  isActive,
}) => {
  return <Key id={id} keyName={value} onClick={onClick} isActive={isActive} />;
};

interface ImportKeyProps {
  value: string;
  onClick: (label: string) => void;
  isActive: boolean;
}

const ImportKey: React.FC<ImportKeyProps> = ({ value, onClick, isActive }) => {
  return (
    <Key id={value} keyName={value} onClick={onClick} isActive={isActive} />
  );
};

interface ControllerButtonsProps {
  updateController: (newValue: string) => void;
  buttonMap: KeyMap;
  resetMap: () => void;
  activeButton: string;
}

interface KeyMap {
  [id: string]: string;
}

const ControllerButtons: React.FC<ControllerButtonsProps> = ({
  updateController,
  buttonMap,
  resetMap,
  activeButton,
}) => {
  const handleActivateButton = (button: string) => {
    updateController(button);
  };

  const handleClickOff = () => {
    updateController("");
  };

  const renderKeys = (ids: string[]) => (
    <>
      {ids.map((id) => (
        <div key={id} className="mb-2">
          <ControllerKey
            id={id}
            value={buttonMap[id]}
            onClick={handleActivateButton}
            isActive={activeButton === id}
          />
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className="flex w-full p-2 justify-between">
        <div className="flex-1">
          <div className="flex h-full items-center p-4">
    				<a href="/" rel="noopener noreferrer">
            	<img
            	  src="images/fightform-text-transparent.png"
            	  alt="FIGHTFORM logo"
            	  className="h-6"
            	/>
						</a>
          </div>
        </div>
        <div className="flex-auto">
          <div className="flex items-center justify-center p-2">
            <button
              onClick={resetMap}
              className="bg-zinc-300 text-zinc-900 font-semibold py-2 px-4 my-2 rounded-full hover:bg-zinc-200 active:bg-zinc-400"
            >
              Reset to defaults
            </button>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div
        onClick={handleClickOff}
        className="flex w-full h-3/4 items-center justify-center"
      >
        <div>
          <div className="flex justify-center mr-36">
            <div className="my-8">{renderKeys(["l5"])}</div>
            <div className="my-6">{renderKeys(["l4"])}</div>
            <div>{renderKeys(["l3a", "l3b"])}</div>
            <div className="mt-4 mb-16">{renderKeys(["l2"])}</div>
          </div>

          <div className="flex w-max ml-auto">
            <div className="mt-20">{renderKeys(["l1a"])}</div>
            <div className="mt-2">{renderKeys(["l1c", "l1b"])}</div>
          </div>
        </div>
        <div className="flex justify-center items-center mx-12">
          {renderKeys(["m1", "m2"])}
        </div>
        <div>
          <div className="flex justify-center ml-36">
            <div className="mt-2">{renderKeys(["r2a", "r2b"])}</div>
            <div>{renderKeys(["r3a", "r3b"])}</div>
            <div className="my-6">{renderKeys(["r4"])}</div>
            <div className="my-8">{renderKeys(["r5"])}</div>
          </div>

          <div className="flex w-max mr-auto">
            <div className="mt-2">{renderKeys(["r1c", "r1b"])}</div>
            <div className="mt-20">{renderKeys(["r1a"])}</div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ImportButtonsProps {
  updateImports: (newValue: string) => void;
  activeImportButton: string;
}

const ImportButtons: React.FC<ImportButtonsProps> = ({
  updateImports,
  activeImportButton,
}) => {
  const handleActivateImportButton = (button: string) => {
    updateImports(button);
  };

  const handleClickOff = () => {
    updateImports("");
  };

  const renderImportKeys = () => {
    const ids = [
      "A",
      "B",
      "X",
      "Y",
      "L",
      "Z",
      "R",
      "Up",
      "Down",
      "Left",
      "Right",
      "C-Up",
      "C-Down",
      "C-Left",
      "C-Right",
      "START",
      "HOME",
      "MX",
      "MY",
    ];
    return (
      <>
        {ids.map((id) => (
          <div key={id} className="mb-2">
            <ImportKey
              value={id}
              onClick={handleActivateImportButton}
              isActive={activeImportButton === id}
            />
          </div>
        ))}
      </>
    );
  };
  return (
    <div
      onClick={handleClickOff}
      className="flex w-full h-1/4 items-center justify-center"
    >
      <div className="flex m-8 w-full h-full bg-zinc-900 rounded-lg">
        <div className="flex flex-row flex-grow flex-shrink flex-wrap m-16 w-full justify-center items-center">
          {renderImportKeys()}
        </div>
      </div>
    </div>
  );
};

interface ControllerButtonViewProps {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
	mapUpdateTrigger: string;
}

const ControllerButtonView: React.FC<ControllerButtonViewProps> = ({
  config,
  setConfig,
	mapUpdateTrigger
}) => {
  const defaultMap: KeyMap = useMemo(() => ({
    l1a: "MX",
    l1b: "Y",
    l1c: "MY",
    l2: "Right",
    l3a: "Up",
    l3b: "Down",
    l4: "Left",
    l5: "X",
    r1a: "A",
    r1b: "B",
    r1c: "Z",
    r2a: "C-Left",
    r2b: "L",
    r3a: "C-Up",
    r3b: "C-Down",
    r4: "C-Right",
    r5: "R",
    m1: "START",
    m2: "HOME",
  }), []);

  const [map, setMap] = useState<KeyMap>(defaultMap);
  const [activeButton, setActiveButton] = useState("");
  const [activeImportButton, setActiveImportButton] = useState("");

  const updateMap = (id: string, newLabel: string) => {
    setMap((prevLabels) => ({
      ...prevLabels,
      [id]: newLabel,
    }));
  };

  const updateGameModeConfigs = useCallback(
    (gameModeConfigs: Array<GameModeConfig>) => {
      const updatedConfig = new Config({
        gameModeConfigs: gameModeConfigs,
        communicationBackendConfigs: config.communicationBackendConfigs,
      });

      setConfig(updatedConfig);
    },
    [config.communicationBackendConfigs, setConfig],
  );

  const updateGameModeConfigRemappings = (
    gameModeConfig: GameModeConfig,
    newRemappingList: Array<ButtonRemap>,
  ) => {
    return new GameModeConfig({
      activationBinding: gameModeConfig.activationBinding,
      buttonRemapping: newRemappingList,
      customModeConfig: gameModeConfig.customModeConfig,
      keyboardModeConfig: gameModeConfig.keyboardModeConfig,
      modeId: gameModeConfig.modeId,
      name: gameModeConfig.name,
      rgbConfig: gameModeConfig.rgbConfig,
      socdPairs: gameModeConfig.socdPairs,
    });
  };

  const resetBindingsInGameMode = useCallback(
    (index: number) => {
      const resetGameModeConfigs = config.gameModeConfigs.map(
        (gameModeConfig: GameModeConfig, i: number) => {
          if (i === index) {
            return updateGameModeConfigRemappings(gameModeConfig, Array(0));
          }
          return gameModeConfig;
        },
      );

      updateGameModeConfigs(resetGameModeConfigs);
    },
    [config.gameModeConfigs, updateGameModeConfigs],
  );

  const [activeKeys, setActiveKeys] = useState<[string, string]>(["", ""]);

  const handleActiveControllerKeyChange = (newValue: string) => {
    if (newValue === "") {
      setActiveKeys(["", ""]);
    } else {
      setActiveKeys([newValue, activeKeys[1]]);
    }
  };

  const handleActiveImportKeyChange = (newValue: string) => {
    setActiveKeys([activeKeys[0], newValue]);
  };

  const resetMapDefault = useCallback(() => {
    setMap(defaultMap);
    resetBindingsInGameMode(0);
  }, [defaultMap, resetBindingsInGameMode]);
	const resetMapDefaultRef = useRef(resetMapDefault);

  useEffect(() => {
      resetMapDefaultRef.current = resetMapDefault;
  }, [resetMapDefault]);

	useEffect(() => {
		if (mapUpdateTrigger === 'controller connected') {
      const currentResetMapDefault = resetMapDefaultRef.current;
			currentResetMapDefault();
		}
	}, [mapUpdateTrigger]);

  useEffect(() => {
    const idCodeMap: KeyMap = {
      l1a: "BTN_LT1",
      l1b: "BTN_RF6",
      l1c: "BTN_LT2",
      l2: "BTN_LF1",
      l3a: "BTN_RF4",
      l3b: "BTN_LF2",
      l4: "BTN_LF3",
      l5: "BTN_RF2",
      r1a: "BTN_RT1",
      r1b: "BTN_RF1",
      r1c: "BTN_RF3",
      r2a: "BTN_RT3",
      r2b: "BTN_LF4",
      r3a: "BTN_RT4",
      r3b: "BTN_RT2",
      r4: "BTN_RT5",
      r5: "BTN_RF5",
      m1: "BTN_MB2",
      m2: "BTN_MB3",
    };

    const labelCodeMap: KeyMap = {
      MX: "BTN_LT1",
      Y: "BTN_RF6",
      MY: "BTN_LT2",
      Right: "BTN_LF1",
      Up: "BTN_RF4",
      Down: "BTN_LF2",
      Left: "BTN_LF3",
      X: "BTN_RF2",
      A: "BTN_RT1",
      B: "BTN_RF1",
      Z: "BTN_RF3",
      "C-Left": "BTN_RT3",
      L: "BTN_LF4",
      "C-Up": "BTN_RT4",
      "C-Down": "BTN_RT2",
      "C-Right": "BTN_RT5",
      R: "BTN_RF5",
      START: "BTN_MB2",
      HOME: "BTN_MB3",
    };

    const invertMap = (map: KeyMap): { [key: string]: string } => {
      const invertedMap: { [key: string]: string } = {};
      for (const key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
          invertedMap[map[key]] = key;
        }
      }
      return invertedMap;
    };

    const codeIdMap = invertMap(idCodeMap);
    const codeLabelMap = invertMap(labelCodeMap);

    const appendRemappingToGameModeConfig = (
      index: number,
      remapping: ButtonRemap,
    ) => {
      const updatedGameModeConfigs = config.gameModeConfigs.map(
        (gameModeConfig: GameModeConfig, i: number) => {
          if (i === index) {
            const updatedRemappingList =
              gameModeConfig.buttonRemapping.concat(remapping);

            return updateGameModeConfigRemappings(
              gameModeConfig,
              updatedRemappingList,
            );
          }
          return gameModeConfig;
        },
      );
      updateGameModeConfigs(updatedGameModeConfigs);
    };

    const updateBindingInGameMode = (
      index: number,
      newBinding: ButtonRemap,
    ) => {
      if (newBinding.physicalButton === newBinding.activates) {
        const hasExistingMapping = config.gameModeConfigs[
          index
        ].buttonRemapping?.some(
          (remapping) => remapping.physicalButton === newBinding.physicalButton,
        );

        if (hasExistingMapping) {
          if (config.gameModeConfigs[index].buttonRemapping?.length === 1) {
            // the single remapping would be to itself; delete the whole list
            resetBindingsInGameMode(index);
          } else {
            const updatedGameModeConfigs = config.gameModeConfigs.map(
              (gameModeConfig: GameModeConfig, i: number) => {
                if (i === index) {
                  const subtractedRemappingList =
                    gameModeConfig.buttonRemapping.filter(
                      (remapping) =>
                        remapping.physicalButton !== newBinding.physicalButton,
                    );

                  return updateGameModeConfigRemappings(
                    gameModeConfig,
                    subtractedRemappingList,
                  );
                }
                return gameModeConfig;
              },
            );

            updateGameModeConfigs(updatedGameModeConfigs);
          }
        }
        return;
      } else {
        appendRemappingToGameModeConfig(index, newBinding);
      }
    };

    setActiveButton(activeKeys[0]);
    setActiveImportButton(activeKeys[1]);
    if (activeKeys[0] !== "" && activeKeys[1] !== "") {
      // create a new remap if a pair of keys are active
      console.log(
        "create new binding " +
          idCodeMap[activeKeys[0]] +
          " -> " +
          labelCodeMap[activeKeys[1]],
      );
      updateMap(activeKeys[0], activeKeys[1]);
      const newBinding = new ButtonRemap({
        physicalButton: Button[idCodeMap[activeKeys[0]] as keyof typeof Button],
        activates: Button[labelCodeMap[activeKeys[1]] as keyof typeof Button],
      });
      updateBindingInGameMode(0, newBinding);
      setActiveKeys(["", ""]);
    } else {
      // check for any changes to the config, e.g. from a connected device
      config.gameModeConfigs[0].buttonRemapping.forEach((remapping) => {
        updateMap(
          codeIdMap[Button[remapping.physicalButton]],
          codeLabelMap[Button[remapping.activates]],
        );
      });
    }
  }, [
    activeKeys,
    config.gameModeConfigs,
    updateGameModeConfigs,
    resetBindingsInGameMode,
  ]);

  return (
    <div className="flex flex-col h-screen w-3/4 items-center justify-center">
      <ControllerButtons
        updateController={handleActiveControllerKeyChange}
        buttonMap={map}
        resetMap={resetMapDefault}
        activeButton={activeButton}
      />
      <ImportButtons
        updateImports={handleActiveImportKeyChange}
        activeImportButton={activeImportButton}
      />
    </div>
  );
};

export default ControllerButtonView;
