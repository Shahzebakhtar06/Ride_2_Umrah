<template>
  <div id="footer">
    <div class="container">
      <div>
        <div class="logo">
          <img
            src="~/assets/svg/ride2umrah-logo-transparent.png"
            alt=""
            width="100"
            height="80"
          />
        </div>
        <div class="content-wrapper">
          <div class="content" v-for="(menu, index) in menus" :key="index">
            <div class="main-label">
              {{ menu.label }}
            </div>
            <ul class="menu">
              <li v-for="(subMenu, ind) in menu.items" :key="ind">
                <a href="#">{{ subMenu.label }} </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="copy-write-container">
          <small>
            © 2024 Expedia, Inc., an Ride 2 Umrah Group company. All rights
            reserved. Ride 2 Umrah and the Ride_2_Umrah Logo are trademarks or
            registered trademarks of Ride 2 Umrah, Inc. CST# 2029030-50.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          label: "Company",
          items: [
            {
              label: "About",
              url: "https://www.expedia.com/About",
            },
            {
              label: "Jobs",
              url: "https://www.expedia.com/Jobs",
            },
            {
              label: "List your property",
              url: "https://www.expedia.com/List your property",
            },
            {
              label: "Partnerships",
              url: "https://www.expedia.com/Partnerships",
            },
            {
              label: "Newsroom",
              url: "https://www.expedia.com/Newsroom",
            },
            {
              label: "Investor Relations",
              url: "https://www.expedia.com/Investor Relations",
            },
            {
              label: "Advertising",
              url: "https://www.expedia.com/Advertising",
            },
            {
              label: "Affiliate Marketing",
              url: "https://www.expedia.com/Affiliate Marketing",
            },
            {
              label: "Feedback",
              url: "https://www.expedia.com/Feedback",
            },
          ],
        },
        {
          label: "Explore",
          items: [
            {
              label: "United States of America travel guide",
              url: "https://www.expedia.com/United States of America travel guide",
            },
            {
              label: "Hotels in United States of America",
              url: "https://www.expedia.com/Hotels in United States of America",
            },
            {
              label: "Vacation rentals in United States of America",
              url: "https://www.expedia.com/Vacation rentals in United States of America",
            },
            {
              label: "Vacation packages in United States of America",
              url: "https://www.expedia.com/Vacation packages in United States of America",
            },
            {
              label: "Domestic flights",
              url: "https://www.expedia.com/Domestic flights",
            },
            {
              label: "Car rentals in United States of America",
              url: "https://www.expedia.com/Car rentals in United States of America",
            },
            {
              label: "All accommodation types",
              url: "https://www.expedia.com/All accommodation types",
            },
            {
              label: "One Key credit cards",
              url: "https://www.expedia.com/One Key credit cards",
            },
          ],
        },
        {
          label: "Policies",
          items: [
            {
              label: "Privacy",
              url: "https://www.expedia.com/Privacy",
            },
            {
              label: "Cookies",
              url: "https://www.expedia.com/Cookies",
            },
            {
              label: "Terms of use",
              url: "https://www.expedia.com/Terms of use",
            },
            {
              label: "One Key™ terms and conditions",
              url: "https://www.expedia.com/One Key™ terms and conditions",
            },
            {
              label: "Vrbo terms and conditions",
              url: "https://www.expedia.com/Vrbo terms and conditions",
            },
            {
              label: "Accessibility",
              url: "https://www.expedia.com/Accessibility",
            },
            {
              label: "Your privacy choices",
              url: "https://www.expedia.com/Your privacy choices",
            },
            {
              label: "Content guidelines and reporting content",
              url: "https://www.expedia.com/Content guidelines and reporting content",
            },
          ],
        },
        {
          label: "Help",
          items: [
            {
              label: "Support",
              url: "https://www.expedia.com/Support",
            },
            {
              label: "Cancel your hotel or vacation rental book",
              url: "https://www.expedia.com/Cancel your hotel or vacation rental book",
            },
            {
              label: "Cancel your flight",
              url: "https://www.expedia.com/Cancel your flight",
            },
            {
              label: "Refund timelines, policies & processes",
              url: "https://www.expedia.com/Refund timelines, policies & processes",
            },
            {
              label: "Use an Expedia coupon",
              url: "https://www.expedia.com/Use an Expedia coupon",
            },
            {
              label: "International travel documents",
              url: "https://www.expedia.com/International travel documents",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#footer {
  background: #744970b4;
  color: #fff;

  .content-wrapper {
    display: flex;
    justify-content: space-between;
    .main-label {
      font-weight: 600;
    }
    .menu {
      list-style: none;
      padding: 0;
      margin-top: 1rem;
      li {
        padding: 0.5rem 0;
        a{
          color: #fff;
        }
      }
    }
  }
  .copy-write-container {
    text-align: center;
    border-top: 1px solid var(--theme-border-color);
  }
}
</style>
