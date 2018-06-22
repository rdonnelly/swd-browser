/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SWDBrowser"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:236.0/255.0 green:240.0/255.0 blue:241.0/255.0 alpha:1.0];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];


  UIView *loadingView = [[UIView alloc] initWithFrame:rootView.bounds];
  [loadingView setBackgroundColor:[[UIColor alloc] initWithRed:236.0/255.0 green:240.0/255.0 blue:241.0/255.0 alpha:1.0]];


  UIImageView* splashView = [[UIImageView alloc] initWithFrame:loadingView.bounds];
  [splashView setImage:[UIImage imageNamed:@"launch-browser"]];
  [splashView setContentMode:UIViewContentModeCenter];
  [loadingView addSubview:splashView];


  UIActivityIndicatorView *spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
  spinner.color = [[UIColor alloc] initWithRed:26.0/255.0 green:188.0/255.0 blue:156.0/255.0 alpha:1.0];
  spinner.center = CGPointMake(loadingView.frame.size.width * 0.5, loadingView.frame.size.height * 0.85);
  [spinner startAnimating];
  [loadingView addSubview:spinner];


  rootView.loadingView = loadingView;
  rootView.loadingViewFadeDelay = 0.5;
  rootView.loadingViewFadeDuration = 0.5;

  return YES;
}

@end
