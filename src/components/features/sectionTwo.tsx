import React from "react";

function sectionTwo() {
    return (
        <section className="bg-[#1A1F35]">
            <div className="p-4 grid gap-x-7 gap-y-8 justify-center lg:grid-cols-2">
                <article className="px-5.25 py-12 border border-[#2c2c2c] rounded-[1.25rem] section__two__card max-w-[39.093rem] md:h-60.25 flex flex-col justify-center ">
                    <h3 className="text-left font-bold text-2xl mb-5 md:text-4xl ">
                        Decentralized{" "}
                        <span className="text-[#00D4FF]">Risk</span> Pools
                    </h3>

                    <p className="font-bold text-base">
                        Users collectively fund insurance pools, spreading risk
                        across the network. Payouts and pool management are
                        governed transparently by the community.
                    </p>
                </article>

                <article className="px-5.25 py-12 border border-[#2c2c2c] rounded-[1.25rem] section__two__card max-w-[39.093rem] md:h-60.25 flex flex-col justify-center ">
                    <h3 className="text-left font-bold text-2xl mb-5 md:text-4xl ">
                        Full{" "}
                        <span className="text-[#00D4FF]">Transparency</span> &
                        Fraud Resistance
                    </h3>

                    <p className="font-bold text-base">
                        Every policy, claim, and payout is recorded on the
                        Stellar blockchain, creating an immutable audit trail
                        that prevents fraud and increases trust.
                    </p>
                </article>

                <article className="px-5.25 py-12 border border-[#2c2c2c] rounded-[1.25rem] section__two__card max-w-[39.093rem] md:h-60.25 flex flex-col justify-center ">
                    <h3 className="text-left font-bold text-2xl mb-5 md:text-4xl ">
                        Multi-Asset &{" "}
                        <span className="text-[#00D4FF]">Multi-Use</span>{" "}
                        Coverage
                    </h3>

                    <p className="font-bold text-base">
                        Protect a wide range of assets—from health and travel to
                        property and crypto—using a single decentralized
                        insurance platform.
                    </p>
                </article>

                <article className="px-5.25 py-12 border border-[#2c2c2c] rounded-[1.25rem] section__two__card max-w-[39.093rem] md:h-60.25 flex flex-col justify-center ">
                    <h3 className="text-left font-bold text-2xl mb-5 md:text-4xl ">
                        <span className="text-[#00D4FF]">DAO</span> Governance
                    </h3>

                    <p className="font-bold text-base">
                        Policyholders actively shape the platform by creating
                        proposals and voting on key decisions through a
                        decentralized autonomous organization (DAO).
                    </p>
                </article>
            </div>
        </section>
    );
}

export default sectionTwo;
