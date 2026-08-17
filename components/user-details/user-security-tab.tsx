import {
  CreditCard,
  Coins,
  ShieldCheck,
  Cpu,
  Fingerprint,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/user"

export function UserSecurityTab({ user }: { user: User }) {
  const bank = user.bank
  const crypto = user.crypto

  const maskedCardNumber = bank?.cardNumber
    ? `•••• •••• •••• ${bank.cardNumber.slice(-4)}`
    : "•••• •••• •••• ••••"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial & Banking Card */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="size-5 text-primary" />
                <span>Banking Credentials</span>
              </div>
              <Badge variant="secondary">{bank?.currency || "USD"}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Visual Credit Card Preview */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white shadow-lg space-y-4 relative overflow-hidden border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-slate-300">
                  {bank?.cardType || "GLOBAL DEBIT"}
                </span>
                <span className="text-xs font-bold text-amber-400">EMV CHIP</span>
              </div>

              <p className="text-lg sm:text-xl font-mono tracking-widest font-semibold pt-2">
                {maskedCardNumber}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                <div>
                  <p className="text-[10px] text-slate-400">CARDHOLDER</p>
                  <p className="font-bold text-white uppercase">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">EXPIRES</p>
                  <p className="font-bold text-white">{bank?.cardExpire || "MM/YY"}</p>
                </div>
              </div>
            </div>

            {/* IBAN */}
            <div className="p-3.5 rounded-xl border border-border/50 bg-muted/20 space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                International Bank Account Number (IBAN)
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-foreground break-all">
                {bank?.iban || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Crypto & Hardware Telemetry */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="size-5 text-amber-500" />
                <span>Crypto & Web3 Assets</span>
              </div>
              <Badge variant="warning">{crypto?.coin || "Crypto"}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Wallet details */}
            <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  Wallet Address ({crypto?.network || "ERC-20"})
                </p>
                <Badge variant="outline" className="text-[10px]">
                  {crypto?.coin}
                </Badge>
              </div>
              <p className="text-xs font-mono font-semibold text-foreground break-all bg-background/50 p-2 rounded-lg border border-border/40">
                {crypto?.wallet || "0x0000000000000000000000000000000000000000"}
              </p>
            </div>

            {/* Device & Hardware Security */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Cpu className="size-3.5 text-primary" />
                Hardware & Device Telemetry
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40 space-y-0.5">
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Fingerprint className="size-3" />
                    MAC Address
                  </p>
                  <p className="font-mono font-bold text-foreground truncate">
                    {user.macAddress || "00:00:00:00:00:00"}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40 space-y-0.5">
                  <p className="text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="size-3" />
                    Security Clearance
                  </p>
                  <p className="font-semibold capitalize text-foreground">
                    Level {user.role === "admin" ? "3 (Full)" : "1 (Standard)"}
                  </p>
                </div>
              </div>

              {user.userAgent && (
                <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40 space-y-0.5">
                  <p className="text-[11px] text-muted-foreground">Client User Agent</p>
                  <p className="text-[11px] font-mono text-muted-foreground/80 line-clamp-2">
                    {user.userAgent}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
