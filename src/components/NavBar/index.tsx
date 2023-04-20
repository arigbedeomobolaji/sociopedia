import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@src/libs/hooks";
import { useMediaQuery } from "@react-hook/media-query";
import {
  selectChangeTheme,
  toggleTheme,
} from "@src/store/slice/changeThemeSlice";
import {
  MagnifyingGlassIcon,
  SunIcon,
  ChatBubbleBottomCenterTextIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  Bars3BottomLeftIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import {
  DesktopWrapper,
  DesktopWrapperLeft,
  DesktopWrapperRight,
  PageLogo,
  SearchWrapper,
  Input,
  UserLoggedInMenu,
  UserProfile,
  DropDownMenu,
  DropDownItem,
  UserLoggedOutMenu,
  Btn,
  MobileWrapper,
  MobileWrapperLeft,
  MobileWrapperRight,
  MobileDropDownMenu,
} from "./style";

export default function NavBar(): JSX.Element {
  const isDark = useAppSelector(selectChangeTheme);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [moreDetails, setMoreDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 570px)");

  function SearchFn(input: string): void {
    console.log("I was clicked!", input);
    setSearchInput("");
  }

  function changeTheme(): void {
    dispatch(toggleTheme());
  }

  return (
    <div>
      {/* Desktop */}
      <DesktopWrapper $dark={isDark}>
        <DesktopWrapperLeft>
          <PageLogo>Sociopedia</PageLogo>
          <SearchWrapper $dark={isDark}>
            <Input
              $dark={isDark}
              type="text"
              value={searchInput}
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <MagnifyingGlassIcon
              className={`${
                isDark ? "bg-gray-900 text-white" : "bg-black text-white"
              } w-8 h-8 p-2 mr-2 rounded-full cursor-pointer shadow-m`}
              onClick={() => SearchFn(searchInput)}
            />
          </SearchWrapper>
        </DesktopWrapperLeft>
        <DesktopWrapperRight>
          <div
            className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
              isDark ? "text-gray-50" : "text-gray-800"
            }`}
            onClick={() => dispatch(changeTheme)}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </div>

          <ChatBubbleBottomCenterTextIcon
            className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
              isDark ? "text-gray-50" : "text-gray-800"
            }`}
          />
          <BellIcon
            className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
              isDark ? "text-gray-50" : "text-gray-800"
            }`}
          />
          <QuestionMarkCircleIcon
            className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
              isDark ? "text-gray-50" : "text-gray-800"
            }`}
          />
          {false ? (
            <UserLoggedInMenu onClick={() => setMoreDetails(!moreDetails)}>
              <UserProfile $dark={isDark}>
                <p>Fake Man</p>
                {moreDetails ? (
                  <ChevronUpIcon className="w-6 h-6" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6" />
                )}
              </UserProfile>
              {moreDetails && (
                <DropDownMenu $dark={isDark}>
                  <DropDownItem>Logout</DropDownItem>
                  <DropDownItem>Profile</DropDownItem>
                </DropDownMenu>
              )}
            </UserLoggedInMenu>
          ) : (
            <UserLoggedOutMenu>
              <Btn
                type="button"
                className={`${isDark ? "text-gray-50" : "text-gray-800"}`}
              >
                Login
              </Btn>
              <Btn
                type="button"
                className={`${isDark ? "text-gray-50" : "text-gray-800"}`}
              >
                SignUp
              </Btn>
            </UserLoggedOutMenu>
          )}
        </DesktopWrapperRight>
      </DesktopWrapper>

      {/* ****************************************************************************************************** *************************************Mobile*************************************************************** ***********************************************************************************************************/}
      <MobileWrapper $dark={isDark}>
        <MobileWrapperLeft>
          <PageLogo className="xs:text-xs sm:text-sm">Sociopedia</PageLogo>
        </MobileWrapperLeft>
        {/* <MobileWrapperMiddle $dark={isDark}>
        
        </MobileWrapperMiddle>
           */}
        <MobileWrapperRight>
          {isSmallScreen ? (
            <></>
          ) : (
            <div className={` flex shadow-lg h-3/4 py-3 items-center flex-1`}>
              <Input
                $dark={isDark}
                type="text"
                value={searchInput}
                placeholder="Search..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <MagnifyingGlassIcon
                className="w-[35px] h-[35px] p-2 mr-2 text-white bg-black rounded-full cursor-pointer shadow-md"
                onClick={() => SearchFn(searchInput)}
              />
            </div>
          )}
          {/* <div className={`xs:hidden sm:hidden flex`}>
            <Input
              $dark={isDark}
              type="text"
              value={searchInput}
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <MagnifyingGlassIcon
              className="w-[35px] h-[35px] p-2 mr-2 text-white bg-black rounded-full cursor-pointer shadow-md"
              onClick={() => SearchFn(searchInput)}
            />
          </div> */}
          <div
            className={`w-5 h-5  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
              isDark ? "text-gray-500" : "text-gray-800"
            }`}
            onClick={() => dispatch(changeTheme)}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </div>
          <p onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon
                className={`w-5 h-5 ${
                  isDark ? " text-gray-500" : " text-black"
                }`}
              />
            ) : (
              <Bars3BottomLeftIcon
                className={`w-6 h-6 ${
                  isDark ? " text-gray-500" : " text-black"
                }`}
              />
            )}
          </p>
          {isOpen &&
            (true ? (
              <MobileDropDownMenu $dark={isDark}>
                <DropDownItem>Logout</DropDownItem>
                <DropDownItem>Profile</DropDownItem>
              </MobileDropDownMenu>
            ) : (
              <MobileDropDownMenu $dark={isDark}>
                <DropDownItem
                  className={`${isDark ? "text-gray-50" : "text-gray-800"}`}
                >
                  Login
                </DropDownItem>
                <DropDownItem
                  className={`${isDark ? "text-gray-50" : "text-gray-800"}`}
                >
                  Register
                </DropDownItem>
              </MobileDropDownMenu>
            ))}
        </MobileWrapperRight>
      </MobileWrapper>
    </div>
  );
}
