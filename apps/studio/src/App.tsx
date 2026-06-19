import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppShell, AppBar, ModeToggle, SideNav, WindforgeLogo, Stack, Badge } from '@windforge/ui'
import { navItems } from './navConfig'

import { OverviewPage } from './pages/OverviewPage'
import { ThemingPage } from './pages/ThemingPage'
import { CompositionPage } from './pages/CompositionPage'
import { ColorPage } from './pages/foundations/ColorPage'
import { TypographyPage } from './pages/foundations/TypographyPage'
import { SpacingPage } from './pages/foundations/SpacingPage'
import { RadiusPage } from './pages/foundations/RadiusPage'
import { TokensPage } from './pages/foundations/TokensPage'
import { AccessibilityPage } from './pages/foundations/AccessibilityPage'
import { IconographyPage } from './pages/foundations/IconographyPage'

import { ButtonPage } from './pages/components/ButtonPage'
import { BadgePage } from './pages/components/BadgePage'
import { CardPage } from './pages/components/CardPage'
import { InputPage } from './pages/components/InputPage'
import { FormPage } from './pages/components/FormPage'
import { SelectPage } from './pages/components/SelectPage'
import { CheckboxPage } from './pages/components/CheckboxPage'
import { RadioPage } from './pages/components/RadioPage'
import { SwitchPage } from './pages/components/SwitchPage'
import { SliderPage } from './pages/components/SliderPage'
import { TabsPage } from './pages/components/TabsPage'
import { AccordionPage } from './pages/components/AccordionPage'
import { DialogPage } from './pages/components/DialogPage'
import { SheetPage } from './pages/components/SheetPage'
import { PopoverPage } from './pages/components/PopoverPage'
import { DropdownMenuPage } from './pages/components/DropdownMenuPage'
import { TooltipPage } from './pages/components/TooltipPage'
import { AlertPage } from './pages/components/AlertPage'
import { AvatarPage } from './pages/components/AvatarPage'
import { ProgressPage } from './pages/components/ProgressPage'
import { SkeletonPage } from './pages/components/SkeletonPage'
import { TablePage } from './pages/components/TablePage'
import { BreadcrumbPage } from './pages/components/BreadcrumbPage'
import { SeparatorPage } from './pages/components/SeparatorPage'
import { TextareaPage } from './pages/components/TextareaPage'
import { AppShellPage } from './pages/components/AppShellPage'
import { AppBarPage } from './pages/components/AppBarPage'
import { BoxPage } from './pages/components/BoxPage'
import { StackPage } from './pages/components/StackPage'
import { GridPage } from './pages/components/GridPage'
import { TextPage } from './pages/components/TextPage'
import { LinkPage } from './pages/components/LinkPage'
import { ChipPage } from './pages/components/ChipPage'
import { ButtonGroupPage } from './pages/components/ButtonGroupPage'
import { ToggleButtonPage } from './pages/components/ToggleButtonPage'
import { ModalPage } from './pages/components/ModalPage'
import { AutocompletePage } from './pages/components/AutocompletePage'
import { PaginationPage } from './pages/components/PaginationPage'
import { StepperPage } from './pages/components/StepperPage'
import { ToastPage } from './pages/components/ToastPage'
import { ChartPage } from './pages/components/ChartPage'
import { DataTablePage } from './pages/components/DataTablePage'
import { MultiSelectPage } from './pages/components/MultiSelectPage'
import { CommandPage } from './pages/components/CommandPage'
import { DatePickerPage } from './pages/components/DatePickerPage'
import { CodeBlockPage } from './pages/components/CodeBlockPage'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppShell
      sidebar={
        <SideNav
          items={navItems}
          activePath={location.pathname}
          onNavigate={navigate}
          logo={
            <Stack direction="row" align="center" gap="sm">
              <WindforgeLogo />
              <Badge variant="subtle" size="sm">Beta</Badge>
            </Stack>
          }
        />
      }
      header={<AppBar title="Studio" actions={<ModeToggle />} />}
    >
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/theming" element={<ThemingPage />} />
        <Route path="/composition" element={<CompositionPage />} />

        <Route path="/foundations/color" element={<ColorPage />} />
        <Route path="/foundations/typography" element={<TypographyPage />} />
        <Route path="/foundations/spacing" element={<SpacingPage />} />
        <Route path="/foundations/radius" element={<RadiusPage />} />
        <Route path="/foundations/tokens" element={<TokensPage />} />
        <Route path="/foundations/accessibility" element={<AccessibilityPage />} />
        <Route path="/foundations/iconography" element={<IconographyPage />} />

        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/components/badge" element={<BadgePage />} />
        <Route path="/components/card" element={<CardPage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route path="/components/form" element={<FormPage />} />
        <Route path="/components/select" element={<SelectPage />} />
        <Route path="/components/checkbox" element={<CheckboxPage />} />
        <Route path="/components/radio" element={<RadioPage />} />
        <Route path="/components/switch" element={<SwitchPage />} />
        <Route path="/components/slider" element={<SliderPage />} />
        <Route path="/components/tabs" element={<TabsPage />} />
        <Route path="/components/accordion" element={<AccordionPage />} />
        <Route path="/components/dialog" element={<DialogPage />} />
        <Route path="/components/sheet" element={<SheetPage />} />
        <Route path="/components/popover" element={<PopoverPage />} />
        <Route path="/components/dropdown-menu" element={<DropdownMenuPage />} />
        <Route path="/components/tooltip" element={<TooltipPage />} />
        <Route path="/components/alert" element={<AlertPage />} />
        <Route path="/components/avatar" element={<AvatarPage />} />
        <Route path="/components/progress" element={<ProgressPage />} />
        <Route path="/components/skeleton" element={<SkeletonPage />} />
        <Route path="/components/table" element={<TablePage />} />
        <Route path="/components/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="/components/separator" element={<SeparatorPage />} />
        <Route path="/components/textarea" element={<TextareaPage />} />
        <Route path="/components/app-shell" element={<AppShellPage />} />
        <Route path="/components/app-bar" element={<AppBarPage />} />
        <Route path="/components/box" element={<BoxPage />} />
        <Route path="/components/stack" element={<StackPage />} />
        <Route path="/components/grid" element={<GridPage />} />
        <Route path="/components/text" element={<TextPage />} />
        <Route path="/components/link" element={<LinkPage />} />
        <Route path="/components/chip" element={<ChipPage />} />
        <Route path="/components/button-group" element={<ButtonGroupPage />} />
        <Route path="/components/toggle-button" element={<ToggleButtonPage />} />
        <Route path="/components/modal" element={<ModalPage />} />
        <Route path="/components/autocomplete" element={<AutocompletePage />} />
        <Route path="/components/pagination" element={<PaginationPage />} />
        <Route path="/components/stepper" element={<StepperPage />} />
        <Route path="/components/toast" element={<ToastPage />} />
        <Route path="/components/data-table" element={<DataTablePage />} />
        <Route path="/components/multi-select" element={<MultiSelectPage />} />
        <Route path="/components/command" element={<CommandPage />} />
        <Route path="/components/date-picker" element={<DatePickerPage />} />
        <Route path="/components/chart" element={<ChartPage />} />
        <Route path="/components/code-block" element={<CodeBlockPage />} />

        <Route path="*" element={<OverviewPage />} />
      </Routes>
    </AppShell>
  )
}
