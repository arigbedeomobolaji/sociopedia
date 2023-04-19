import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@src/libs/hooks";
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
  MobileWrapperMiddle,
  MobileWrapperRight,
  MobileDropDownMenu,
} from "./style";

export default function NavBar(): JSX.Element {
  const isDark = useAppSelector(selectChangeTheme);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [moreDetails, setMoreDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            className="w-8 h-8 md:w-6 md:h-6 cursor-pointer transition-all hover:scale-105"
            onClick={() => dispatch(changeTheme)}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </div>

          <ChatBubbleBottomCenterTextIcon className="w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105" />
          <BellIcon className="w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105" />
          <QuestionMarkCircleIcon className="w-8 h-  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105" />
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
              <Btn type="button">Login</Btn>
              <Btn type="button">SignUp</Btn>
            </UserLoggedOutMenu>
          )}
        </DesktopWrapperRight>
      </DesktopWrapper>

      {/* ****************************************************************************************************** *************************************Mobile*************************************************************** ***********************************************************************************************************/}
      <MobileWrapper $dark={isDark}>
        <MobileWrapperLeft>
          <PageLogo>Sociopedia</PageLogo>
        </MobileWrapperLeft>
        <MobileWrapperMiddle $dark={isDark}>
          <Input
            $dark={isDark}
            type="text"
            value={searchInput}
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <MagnifyingGlassIcon
            className="w-8 h-8 p-2 mr-2 text-white bg-black rounded-full cursor-pointer shadow-md"
            onClick={() => SearchFn(searchInput)}
          />
        </MobileWrapperMiddle>
        <MobileWrapperRight>
          <p onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon
                className={`w-6 h-6 ${
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
                <DropDownItem>Login</DropDownItem>
                <DropDownItem>Register</DropDownItem>
              </MobileDropDownMenu>
            ))}
        </MobileWrapperRight>
      </MobileWrapper>
    </div>
  );
}
