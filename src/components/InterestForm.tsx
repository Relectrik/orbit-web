"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InterestForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+1");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: `${countryCode}${phone}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setStatus("success");
      setMessage("Surprise! Orbit isn't open for take-off just yet, but you're officially on the launch list 🚀");
      setName("");
      setEmail("");
      setCountryCode("+1");
      setPhone("");
    } catch (err: unknown) {
      const error = err as { message?: string } | Error;
      setStatus("error");
      setMessage((error as Error)?.message || (error as { message?: string })?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md glass rounded-2xl p-8">
      {status !== "success" && (
        <div className="space-y-4">
          <Input
            type="text"
            required
            autoComplete="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-2">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white" side="bottom" align="start">
                <SelectItem value="+355">🇦🇱 +355 Albania</SelectItem>
                <SelectItem value="+213">🇩🇿 +213 Algeria</SelectItem>
                <SelectItem value="+376">🇦🇩 +376 Andorra</SelectItem>
                <SelectItem value="+244">🇦🇴 +244 Angola</SelectItem>
                <SelectItem value="+672">🇦🇶 +672 Antarctica</SelectItem>
                <SelectItem value="+684">🇦🇸 +684 American Samoa</SelectItem>
                <SelectItem value="+54">🇦🇷 +54 Argentina</SelectItem>
                <SelectItem value="+374">🇦🇲 +374 Armenia</SelectItem>
                <SelectItem value="+297">🇦🇼 +297 Aruba</SelectItem>
                <SelectItem value="+61">🇦🇺 +61 Australia</SelectItem>
                <SelectItem value="+43">🇦🇹 +43 Austria</SelectItem>
                <SelectItem value="+994">🇦🇿 +994 Azerbaijan</SelectItem>
                <SelectItem value="+973">🇧🇭 +973 Bahrain</SelectItem>
                <SelectItem value="+880">🇧🇩 +880 Bangladesh</SelectItem>
                <SelectItem value="+32">🇧🇪 +32 Belgium</SelectItem>
                <SelectItem value="+501">🇧🇿 +501 Belize</SelectItem>
                <SelectItem value="+229">🇧🇯 +229 Benin</SelectItem>
                <SelectItem value="+975">🇧🇹 +975 Bhutan</SelectItem>
                <SelectItem value="+591">🇧🇴 +591 Bolivia</SelectItem>
                <SelectItem value="+387">🇧🇦 +387 Bosnia and Herzegovina</SelectItem>
                <SelectItem value="+267">🇧🇼 +267 Botswana</SelectItem>
                <SelectItem value="+55">🇧🇷 +55 Brazil</SelectItem>
                <SelectItem value="+246">🇮🇴 +246 British Indian Ocean Territory</SelectItem>
                <SelectItem value="+673">🇧🇳 +673 Brunei</SelectItem>
                <SelectItem value="+359">🇧🇬 +359 Bulgaria</SelectItem>
                <SelectItem value="+226">🇧🇫 +226 Burkina Faso</SelectItem>
                <SelectItem value="+257">🇧🇮 +257 Burundi</SelectItem>
                <SelectItem value="+855">🇰🇭 +855 Cambodia</SelectItem>
                <SelectItem value="+237">🇨🇲 +237 Cameroon</SelectItem>
                <SelectItem value="+1">🇺🇸 +1 United States</SelectItem>
                <SelectItem value="+238">🇨🇻 +238 Cape Verde</SelectItem>
                <SelectItem value="+236">🇨🇫 +236 Central African Republic</SelectItem>
                <SelectItem value="+235">🇹🇩 +235 Chad</SelectItem>
                <SelectItem value="+56">🇨🇱 +56 Chile</SelectItem>
                <SelectItem value="+86">🇨🇳 +86 China</SelectItem>
                <SelectItem value="+57">🇨🇴 +57 Colombia</SelectItem>
                <SelectItem value="+269">🇰🇲 +269 Comoros</SelectItem>
                <SelectItem value="+243">🇨🇩 +243 Democratic Republic of the Congo</SelectItem>
                <SelectItem value="+242">🇨🇬 +242 Republic of the Congo</SelectItem>
                <SelectItem value="+682">🇨🇰 +682 Cook Islands</SelectItem>
                <SelectItem value="+506">🇨🇷 +506 Costa Rica</SelectItem>
                <SelectItem value="+225">🇨🇮 +225 Ivory Coast</SelectItem>
                <SelectItem value="+385">🇭🇷 +385 Croatia</SelectItem>
                <SelectItem value="+53">🇨🇺 +53 Cuba</SelectItem>
                <SelectItem value="+357">🇨🇾 +357 Cyprus</SelectItem>
                <SelectItem value="+420">🇨🇿 +420 Czech Republic</SelectItem>
                <SelectItem value="+45">🇩🇰 +45 Denmark</SelectItem>
                <SelectItem value="+253">🇩🇯 +253 Djibouti</SelectItem>
                <SelectItem value="+508">🇵🇲 +508 Saint Pierre and Miquelon</SelectItem>
                <SelectItem value="+593">🇪🇨 +593 Ecuador</SelectItem>
                <SelectItem value="+20">🇪🇬 +20 Egypt</SelectItem>
                <SelectItem value="+503">🇸🇻 +503 El Salvador</SelectItem>
                <SelectItem value="+240">🇬🇶 +240 Equatorial Guinea</SelectItem>
                <SelectItem value="+291">🇪🇷 +291 Eritrea</SelectItem>
                <SelectItem value="+372">🇪🇪 +372 Estonia</SelectItem>
                <SelectItem value="+268">🇸🇿 +268 Eswatini</SelectItem>
                <SelectItem value="+251">🇪🇹 +251 Ethiopia</SelectItem>
                <SelectItem value="+500">🇫🇰 +500 Falkland Islands</SelectItem>
                <SelectItem value="+298">🇫🇴 +298 Faroe Islands</SelectItem>
                <SelectItem value="+679">🇫🇯 +679 Fiji</SelectItem>
                <SelectItem value="+358">🇫🇮 +358 Finland</SelectItem>
                <SelectItem value="+33">🇫🇷 +33 France</SelectItem>
                <SelectItem value="+594">🇬🇫 +594 French Guiana</SelectItem>
                <SelectItem value="+689">🇵🇫 +689 French Polynesia</SelectItem>
                <SelectItem value="+241">🇬🇦 +241 Gabon</SelectItem>
                <SelectItem value="+220">🇬🇲 +220 Gambia</SelectItem>
                <SelectItem value="+995">🇬🇪 +995 Georgia</SelectItem>
                <SelectItem value="+49">🇩🇪 +49 Germany</SelectItem>
                <SelectItem value="+233">🇬🇭 +233 Ghana</SelectItem>
                <SelectItem value="+350">🇬🇮 +350 Gibraltar</SelectItem>
                <SelectItem value="+30">🇬🇷 +30 Greece</SelectItem>
                <SelectItem value="+299">🇬🇱 +299 Greenland</SelectItem>
                <SelectItem value="+502">🇬🇹 +502 Guatemala</SelectItem>
                <SelectItem value="+224">🇬🇳 +224 Guinea</SelectItem>
                <SelectItem value="+245">🇬🇼 +245 Guinea-Bissau</SelectItem>
                <SelectItem value="+592">🇬🇾 +592 Guyana</SelectItem>
                <SelectItem value="+509">🇭🇹 +509 Haiti</SelectItem>
                <SelectItem value="+504">🇭🇳 +504 Honduras</SelectItem>
                <SelectItem value="+852">🇭🇰 +852 Hong Kong</SelectItem>
                <SelectItem value="+36">🇭🇺 +36 Hungary</SelectItem>
                <SelectItem value="+354">🇮🇸 +354 Iceland</SelectItem>
                <SelectItem value="+91">🇮🇳 +91 India</SelectItem>
                <SelectItem value="+62">🇮🇩 +62 Indonesia</SelectItem>
                <SelectItem value="+98">🇮🇷 +98 Iran</SelectItem>
                <SelectItem value="+972">🇮🇱 +972 Israel</SelectItem>
                <SelectItem value="+39">🇮🇹 +39 Italy</SelectItem>
                <SelectItem value="+81">🇯🇵 +81 Japan</SelectItem>
                <SelectItem value="+962">🇯🇴 +962 Jordan</SelectItem>
                <SelectItem value="+7">🇷🇺 +7 Russia</SelectItem>
                <SelectItem value="+254">🇰🇪 +254 Kenya</SelectItem>
                <SelectItem value="+690">🇹🇰 +690 Tokelau</SelectItem>
                <SelectItem value="+686">🇰🇮 +686 Kiribati</SelectItem>
                <SelectItem value="+850">🇰🇵 +850 North Korea</SelectItem>
                <SelectItem value="+82">🇰🇷 +82 South Korea</SelectItem>
                <SelectItem value="+383">🇽🇰 +383 Kosovo</SelectItem>
                <SelectItem value="+965">🇰🇼 +965 Kuwait</SelectItem>
                <SelectItem value="+996">🇰🇬 +996 Kyrgyzstan</SelectItem>
                <SelectItem value="+856">🇱🇦 +856 Laos</SelectItem>
                <SelectItem value="+371">🇱🇻 +371 Latvia</SelectItem>
                <SelectItem value="+961">🇱🇧 +961 Lebanon</SelectItem>
                <SelectItem value="+266">🇱🇸 +266 Lesotho</SelectItem>
                <SelectItem value="+231">🇱🇷 +231 Liberia</SelectItem>
                <SelectItem value="+218">🇱🇾 +218 Libya</SelectItem>
                <SelectItem value="+423">🇱🇮 +423 Liechtenstein</SelectItem>
                <SelectItem value="+370">🇱🇹 +370 Lithuania</SelectItem>
                <SelectItem value="+352">🇱🇺 +352 Luxembourg</SelectItem>
                <SelectItem value="+853">🇲🇴 +853 Macau</SelectItem>
                <SelectItem value="+389">🇲🇰 +389 North Macedonia</SelectItem>
                <SelectItem value="+261">🇲🇬 +261 Madagascar</SelectItem>
                <SelectItem value="+265">🇲🇼 +265 Malawi</SelectItem>
                <SelectItem value="+60">🇲🇾 +60 Malaysia</SelectItem>
                <SelectItem value="+960">🇲🇻 +960 Maldives</SelectItem>
                <SelectItem value="+223">🇲🇱 +223 Mali</SelectItem>
                <SelectItem value="+356">🇲🇹 +356 Malta</SelectItem>
                <SelectItem value="+692">🇲🇭 +692 Marshall Islands</SelectItem>
                <SelectItem value="+596">🇲🇶 +596 Martinique</SelectItem>
                <SelectItem value="+222">🇲🇷 +222 Mauritania</SelectItem>
                <SelectItem value="+230">🇲🇺 +230 Mauritius</SelectItem>
                <SelectItem value="+52">🇲🇽 +52 Mexico</SelectItem>
                <SelectItem value="+691">🇫🇲 +691 Micronesia</SelectItem>
                <SelectItem value="+373">🇲🇩 +373 Moldova</SelectItem>
                <SelectItem value="+377">🇲🇨 +377 Monaco</SelectItem>
                <SelectItem value="+976">🇲🇳 +976 Mongolia</SelectItem>
                <SelectItem value="+382">🇲🇪 +382 Montenegro</SelectItem>
                <SelectItem value="+212">🇲🇦 +212 Morocco</SelectItem>
                <SelectItem value="+258">🇲🇿 +258 Mozambique</SelectItem>
                <SelectItem value="+95">🇲🇲 +95 Myanmar</SelectItem>
                <SelectItem value="+264">🇳🇦 +264 Namibia</SelectItem>
                <SelectItem value="+674">🇳🇷 +674 Nauru</SelectItem>
                <SelectItem value="+977">🇳🇵 +977 Nepal</SelectItem>
                <SelectItem value="+31">🇳🇱 +31 Netherlands</SelectItem>
                <SelectItem value="+687">🇳🇨 +687 New Caledonia</SelectItem>
                <SelectItem value="+64">🇳🇿 +64 New Zealand</SelectItem>
                <SelectItem value="+505">🇳🇮 +505 Nicaragua</SelectItem>
                <SelectItem value="+227">🇳🇪 +227 Niger</SelectItem>
                <SelectItem value="+234">🇳🇬 +234 Nigeria</SelectItem>
                <SelectItem value="+683">🇳🇺 +683 Niue</SelectItem>
                <SelectItem value="+47">🇳🇴 +47 Norway</SelectItem>
                <SelectItem value="+968">🇴🇲 +968 Oman</SelectItem>
                <SelectItem value="+92">🇵🇰 +92 Pakistan</SelectItem>
                <SelectItem value="+680">🇵🇼 +680 Palau</SelectItem>
                <SelectItem value="+970">🇵🇸 +970 Palestine</SelectItem>
                <SelectItem value="+507">🇵🇦 +507 Panama</SelectItem>
                <SelectItem value="+675">🇵🇬 +675 Papua New Guinea</SelectItem>
                <SelectItem value="+595">🇵🇾 +595 Paraguay</SelectItem>
                <SelectItem value="+51">🇵🇪 +51 Peru</SelectItem>
                <SelectItem value="+63">🇵🇭 +63 Philippines</SelectItem>
                <SelectItem value="+48">🇵🇱 +48 Poland</SelectItem>
                <SelectItem value="+351">🇵🇹 +351 Portugal</SelectItem>
                <SelectItem value="+974">🇶🇦 +974 Qatar</SelectItem>
                <SelectItem value="+262">🇷🇪 +262 Réunion</SelectItem>
                <SelectItem value="+40">🇷🇴 +40 Romania</SelectItem>
                <SelectItem value="+381">🇷🇸 +381 Serbia</SelectItem>
                <SelectItem value="+250">🇷🇼 +250 Rwanda</SelectItem>
                <SelectItem value="+290">🇸🇭 +290 Saint Helena</SelectItem>
                <SelectItem value="+685">🇼🇸 +685 Samoa</SelectItem>
                <SelectItem value="+378">🇸🇲 +378 San Marino</SelectItem>
                <SelectItem value="+239">🇸🇹 +239 São Tomé and Príncipe</SelectItem>
                <SelectItem value="+966">🇸🇦 +966 Saudi Arabia</SelectItem>
                <SelectItem value="+221">🇸🇳 +221 Senegal</SelectItem>
                <SelectItem value="+248">🇸🇨 +248 Seychelles</SelectItem>
                <SelectItem value="+232">🇸🇱 +232 Sierra Leone</SelectItem>
                <SelectItem value="+65">🇸🇬 +65 Singapore</SelectItem>
                <SelectItem value="+421">🇸🇰 +421 Slovakia</SelectItem>
                <SelectItem value="+386">🇸🇮 +386 Slovenia</SelectItem>
                <SelectItem value="+677">🇸🇧 +677 Solomon Islands</SelectItem>
                <SelectItem value="+252">🇸🇴 +252 Somalia</SelectItem>
                <SelectItem value="+27">🇿🇦 +27 South Africa</SelectItem>
                <SelectItem value="+34">🇪🇸 +34 Spain</SelectItem>
                <SelectItem value="+94">🇱🇰 +94 Sri Lanka</SelectItem>
                <SelectItem value="+249">🇸🇩 +249 Sudan</SelectItem>
                <SelectItem value="+597">🇸🇷 +597 Suriname</SelectItem>
                <SelectItem value="+46">🇸🇪 +46 Sweden</SelectItem>
                <SelectItem value="+41">🇨🇭 +41 Switzerland</SelectItem>
                <SelectItem value="+963">🇸🇾 +963 Syria</SelectItem>
                <SelectItem value="+886">🇹🇼 +886 Taiwan</SelectItem>
                <SelectItem value="+992">🇹🇯 +992 Tajikistan</SelectItem>
                <SelectItem value="+255">🇹🇿 +255 Tanzania</SelectItem>
                <SelectItem value="+66">🇹🇭 +66 Thailand</SelectItem>
                <SelectItem value="+670">🇹🇱 +670 East Timor</SelectItem>
                <SelectItem value="+228">🇹🇬 +228 Togo</SelectItem>
                <SelectItem value="+676">🇹🇴 +676 Tonga</SelectItem>
                <SelectItem value="+993">🇹🇲 +993 Turkmenistan</SelectItem>
                <SelectItem value="+688">🇹🇻 +688 Tuvalu</SelectItem>
                <SelectItem value="+256">🇺🇬 +256 Uganda</SelectItem>
                <SelectItem value="+380">🇺🇦 +380 Ukraine</SelectItem>
                <SelectItem value="+971">🇦🇪 +971 United Arab Emirates</SelectItem>
                <SelectItem value="+44">🇬🇧 +44 United Kingdom</SelectItem>
                <SelectItem value="+598">🇺🇾 +598 Uruguay</SelectItem>
                <SelectItem value="+998">🇺🇿 +998 Uzbekistan</SelectItem>
                <SelectItem value="+678">🇻🇺 +678 Vanuatu</SelectItem>
                <SelectItem value="+58">🇻🇪 +58 Venezuela</SelectItem>
                <SelectItem value="+84">🇻🇳 +84 Vietnam</SelectItem>
                <SelectItem value="+681">🇼🇫 +681 Wallis and Futuna</SelectItem>
                <SelectItem value="+967">🇾🇪 +967 Yemen</SelectItem>
                <SelectItem value="+260">🇿🇲 +260 Zambia</SelectItem>
                <SelectItem value="+263">🇿🇼 +263 Zimbabwe</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="tel"
              required
              autoComplete="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1"
            />
          </div>
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Sending…" : "Join"}
          </Button>
        </div>
      )}
      {status === "success" && (
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-foreground text-lg font-medium">{message}</p>
        </div>
      )}
      {status === "error" && message && (
        <p className="mt-3 text-sm text-red-600">{message}</p>
      )}
      {status !== "success" && (
        <p className="mt-2 text-xs text-foreground/60">Limited beta: 50 early members only.</p>
      )}
    </form>
  );
}


