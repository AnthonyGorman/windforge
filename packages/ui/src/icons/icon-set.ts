import {
  // arrows & chevrons
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, ChevronsUpDown, ChevronsLeft, ChevronsRight, CornerDownLeft,
  // navigation & layout
  Menu, MoreHorizontal, MoreVertical, Home, Search, LayoutDashboard, LayoutGrid,
  PanelLeft, PanelRight, PanelTop, Map, MapPin, Globe, ExternalLink, Link, Filter,
  // actions
  Plus, Minus, X, Check, Copy, ClipboardCheck, Pencil, Trash2, Save, Download, Upload,
  Share2, RefreshCw, RotateCw, Settings, SlidersHorizontal, Send, Eye, EyeOff, Maximize2,
  // status & feedback
  Info, AlertTriangle, AlertCircle, CheckCircle2, XCircle, HelpCircle, Ban, ShieldCheck,
  Shield, Bell, BellRing, BellOff, LoaderCircle, Star, Heart, Bookmark, Flag, ThumbsUp,
  // files & data
  File, FileText, Folder, FolderOpen, Image, Paperclip, Inbox, Archive, Package, Box,
  Boxes, Database, Server, Cloud, Calendar, Clock,
  // communication
  Mail, MessageSquare, MessageCircle, Phone, AtSign, Hash, Megaphone, Rss,
  // media
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Mic, MicOff, Camera, Video, Music,
  // text & formatting
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List,
  ListOrdered, ListChecks, Type, Code2, Quote,
  // people & commerce
  User, Users, UserPlus, CircleUser, LogIn, LogOut, CreditCard, ShoppingCart, DollarSign,
  Wallet, Gift, Briefcase, Building2,
  // toggles & shapes
  ToggleLeft, ToggleRight, Circle, CircleDot, CircleDashed, Square, CheckSquare, Shapes, Tag,
  // theming & system
  Palette, SwatchBook, Sun, Moon, MonitorSmartphone, Sparkles, Rocket, Zap, Layers, Ruler,
  Gauge, Accessibility, Lock, Unlock, Bot, Terminal, GitBranch, TrendingUp, Activity,
  type LucideIcon,
} from 'lucide-react'

/**
 * COMMONLY-USED LUCIDE ICONS — a reference selection, grouped by purpose.
 *
 * lucide-react is the design system's supported icon library; consumers import
 * icons directly from it. These are NOT re-exported as Windforge icons — this
 * map just powers a browsable, on-brand subset on the Iconography page (the ones
 * the system actually uses plus the obvious gaps), with an escape hatch to the
 * full library for the long tail. Object-shorthand keys keep each entry's name in
 * sync with its component, and the explicit imports keep this list tree-shakeable.
 */
export const commonIconGroups: { label: string; icons: Record<string, LucideIcon> }[] = [
  { label: 'Arrows & chevrons', icons: { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronsLeft, ChevronsRight, CornerDownLeft } },
  { label: 'Navigation & layout', icons: { Menu, MoreHorizontal, MoreVertical, Home, Search, LayoutDashboard, LayoutGrid, PanelLeft, PanelRight, PanelTop, Map, MapPin, Globe, ExternalLink, Link, Filter } },
  { label: 'Actions', icons: { Plus, Minus, X, Check, Copy, ClipboardCheck, Pencil, Trash2, Save, Download, Upload, Share2, RefreshCw, RotateCw, Settings, SlidersHorizontal, Send, Eye, EyeOff, Maximize2 } },
  { label: 'Status & feedback', icons: { Info, AlertTriangle, AlertCircle, CheckCircle2, XCircle, HelpCircle, Ban, ShieldCheck, Shield, Bell, BellRing, BellOff, LoaderCircle, Star, Heart, Bookmark, Flag, ThumbsUp } },
  { label: 'Files & data', icons: { File, FileText, Folder, FolderOpen, Image, Paperclip, Inbox, Archive, Package, Box, Boxes, Database, Server, Cloud, Calendar, Clock } },
  { label: 'Communication', icons: { Mail, MessageSquare, MessageCircle, Phone, AtSign, Hash, Megaphone, Rss } },
  { label: 'Media', icons: { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Mic, MicOff, Camera, Video, Music } },
  { label: 'Text & formatting', icons: { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, ListChecks, Type, Code2, Quote } },
  { label: 'People & commerce', icons: { User, Users, UserPlus, CircleUser, LogIn, LogOut, CreditCard, ShoppingCart, DollarSign, Wallet, Gift, Briefcase, Building2 } },
  { label: 'Toggles & shapes', icons: { ToggleLeft, ToggleRight, Circle, CircleDot, CircleDashed, Square, CheckSquare, Shapes, Tag } },
  { label: 'Theming & system', icons: { Palette, SwatchBook, Sun, Moon, MonitorSmartphone, Sparkles, Rocket, Zap, Layers, Ruler, Gauge, Accessibility, Lock, Unlock, Bot, Terminal, GitBranch, TrendingUp, Activity } },
]

/** The flat name → component map across all groups. */
export const commonIcons: Record<string, LucideIcon> = Object.assign({}, ...commonIconGroups.map((g) => g.icons))
